import { Injectable } from '@angular/core';
import { collection, onSnapshot } from 'firebase/firestore';
import { Observable, combineLatest, map } from 'rxjs';
import { Post } from '../models/post.model';
import { Project } from '../models/project.model';
import { ActivityDay, ActivityEvent } from '../models/activity.model';
import { db } from './firebase.init';

/**
 * Сервіс для побудови календаря активності (Activity Heatmap).
 * Зчитує дати createdAt та updatedAt з усіх постів і проєктів,
 * підраховує кількість подій на кожен день і визначає рівень інтенсивності.
 */
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  /**
   * Отримати дані активності за вказаний рік.
   * Комбінує дати з постів і проєктів, рахує кількість подій на день.
   * @param year — рік для генерації даних
   * @returns Observable масиву ActivityDay за кожен день року
   */
  getActivityData(year: number): Observable<ActivityDay[]> {
    /** Підписка на колекцію posts через native onSnapshot */
    const posts$ = new Observable<Post[]>(observer => {
      const unsubscribe = onSnapshot(collection(db, 'posts'), snapshot => {
        const posts = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Post));
        observer.next(posts);
      }, err => observer.error(err));
      return () => unsubscribe();
    });

    /** Підписка на колекцію projects через native onSnapshot */
    const projects$ = new Observable<Project[]>(observer => {
      const unsubscribe = onSnapshot(collection(db, 'projects'), snapshot => {
        const projects = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Project));
        observer.next(projects);
      }, err => observer.error(err));
      return () => unsubscribe();
    });

    return combineLatest([posts$, projects$]).pipe(
      map(([posts, projects]) => {
        /** Збираємо всі дати подій з деталями */
        const dateEvents = new Map<string, ActivityEvent[]>();

        const addEvent = (date: unknown, event: ActivityEvent) => {
          if (!date) return;
          /** Конвертуємо Firestore Timestamp або Date у рядок 'YYYY-MM-DD' (локальний час) */
          const d = (date as { toDate?: () => Date }).toDate
            ? (date as { toDate: () => Date }).toDate()
            : new Date(date as string);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          if (!dateEvents.has(key)) {
            dateEvents.set(key, []);
          }
          dateEvents.get(key)!.push(event);
        };

        /** Функція для отримання title з translations */
        const getTitle = (item: Post | Project): string => {
          // Перевірка на існування translations (для сумісності зі старими даними)
          if (!item.translations) {
            return 'Untitled';
          }
          return item.translations.uk?.title ||
                 item.translations.pl?.title ||
                 item.translations.en?.title ||
                 'Untitled';
        };

        /** Проходимо по всіх постах і проєктах */
        posts.forEach(post => {
          const title = getTitle(post);
          addEvent(post.createdAt, { type: 'created', contentType: 'post', title, id: post.id || '' });
          addEvent(post.updatedAt, { type: 'updated', contentType: 'post', title, id: post.id || '' });
        });
        projects.forEach(project => {
          const title = getTitle(project);
          addEvent(project.createdAt, { type: 'created', contentType: 'project', title, id: project.id || '' });
          addEvent(project.updatedAt, { type: 'updated', contentType: 'project', title, id: project.id || '' });
        });

        /** Генеруємо масив днів за вказаний рік */
        return this.generateYearDays(year, dateEvents);
      })
    );
  }

  /**
   * Отримати останню активність (останні N подій).
   * @returns Observable масиву останніх подій
   */
  getLastActivity(): Observable<{ date: string; event: ActivityEvent }[]> {
    const posts$ = new Observable<Post[]>(observer => {
      const unsubscribe = onSnapshot(collection(db, 'posts'), snapshot => {
        const posts = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Post));
        observer.next(posts);
      }, err => observer.error(err));
      return () => unsubscribe();
    });

    const projects$ = new Observable<Project[]>(observer => {
      const unsubscribe = onSnapshot(collection(db, 'projects'), snapshot => {
        const projects = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Project));
        observer.next(projects);
      }, err => observer.error(err));
      return () => unsubscribe();
    });

    return combineLatest([posts$, projects$]).pipe(
      map(([posts, projects]) => {
        const allEvents: { date: Date; dateStr: string; event: ActivityEvent }[] = [];

        const toDate = (date: unknown): Date | null => {
          if (!date) return null;
          return (date as { toDate?: () => Date }).toDate
            ? (date as { toDate: () => Date }).toDate()
            : new Date(date as string);
        };

        const formatDate = (d: Date) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        const getTitle = (item: Post | Project): string => {
          if (!item.translations) {
            return 'Untitled';
          }
          return item.translations.uk?.title ||
                 item.translations.pl?.title ||
                 item.translations.en?.title ||
                 'Untitled';
        };

        posts.forEach(post => {
          const title = getTitle(post);
          const created = toDate(post.createdAt);
          if (created) allEvents.push({ date: created, dateStr: formatDate(created), event: { type: 'created', contentType: 'post', title, id: post.id || '' } });
          const updated = toDate(post.updatedAt);
          if (updated) allEvents.push({ date: updated, dateStr: formatDate(updated), event: { type: 'updated', contentType: 'post', title, id: post.id || '' } });
        });

        projects.forEach(project => {
          const title = getTitle(project);
          const created = toDate(project.createdAt);
          if (created) allEvents.push({ date: created, dateStr: formatDate(created), event: { type: 'created', contentType: 'project', title, id: project.id || '' } });
          const updated = toDate(project.updatedAt);
          if (updated) allEvents.push({ date: updated, dateStr: formatDate(updated), event: { type: 'updated', contentType: 'project', title, id: project.id || '' } });
        });

        /** Сортуємо за датою (найновіші першими) та беремо 5 останніх */
        return allEvents
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 5)
          .map(e => ({ date: e.dateStr, event: e.event }));
      })
    );
  }

  /**
   * Генерує масив ActivityDay для кожного дня вказаного року.
   * @param year — рік
   * @param dateEvents — Map з подіями на кожну дату
   */
  private generateYearDays(year: number, dateEvents: Map<string, ActivityEvent[]>): ActivityDay[] {
    const days: ActivityDay[] = [];

    /** Починаємо з 1 січня вказаного року */
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      /** Форматуємо дату як YYYY-MM-DD у локальному часовому поясі (без UTC-зсуву) */
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const events = dateEvents.get(dateStr) || [];
      const count = events.length;

      days.push({
        date: dateStr,
        count,
        /** Рівень інтенсивності: 0 = немає, 1 = мало, 2 = середньо, 3 = багато, 4 = дуже багато */
        level: this.getLevel(count),
        events
      });
    }

    return days;
  }

  /**
   * Визначає рівень інтенсивності за кількістю подій.
   * @param count — кількість подій у день
   * @returns рівень від 0 до 4
   */
  private getLevel(count: number): number {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  }
}
