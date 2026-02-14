import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { db } from './firebase.init';

/**
 * Сервіс для роботи з проєктами.
 * Виконує CRUD-операції з колекцією 'projects' у Firestore.
 * Використовує native firebase/firestore SDK для уникнення конфліктів з @angular/fire.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  /**
   * Отримати всі опубліковані проєкти, відсортовані за датою.
   * Використовується на публічній сторінці проєктів.
   */
  getProjects(): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      const q = query(
        collection(db, 'projects'),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        const projects = snapshot.docs.map(d => this.docToProject(d));
        observer.next(projects);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати ВСІ проєкти (включно з чернетками) — для адмін-панелі.
   */
  getAllProjects(): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const projects = snapshot.docs.map(d => this.docToProject(d));
        observer.next(projects);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати один проєкт за його ID.
   * @param id — ідентифікатор документа у Firestore
   */
  getProjectById(id: string): Observable<Project | undefined> {
    return new Observable<Project | undefined>(observer => {
      const docRef = doc(db, 'projects', id);
      const unsubscribe = onSnapshot(docRef, snapshot => {
        if (snapshot.exists()) {
          observer.next(this.docToProject(snapshot));
        } else {
          observer.next(undefined);
        }
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати проєкти за тегом (для фільтрації по хештегу).
   * @param tag — хештег для фільтрації
   */
  getProjectsByTag(tag: string): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      const q = query(
        collection(db, 'projects'),
        where('published', '==', true),
        where('tags', 'array-contains', tag)
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        const projects = snapshot.docs.map(d => this.docToProject(d));
        observer.next(projects);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Створити новий проєкт (адмін-панель).
   * @param project — дані нового проєкту (без id)
   */
  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Timestamp.now();
    return addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: now,
      updatedAt: now
    });
  }

  /**
   * Оновити існуючий проєкт (адмін-панель).
   * @param id — ідентифікатор проєкту
   * @param project — часткові дані для оновлення
   */
  updateProject(id: string, project: Partial<Project>) {
    return updateDoc(doc(db, 'projects', id), {
      ...project,
      updatedAt: Timestamp.now()
    });
  }

  /**
   * Видалити проєкт (адмін-панель).
   * @param id — ідентифікатор проєкту
   */
  deleteProject(id: string) {
    return deleteDoc(doc(db, 'projects', id));
  }

  /**
   * Конвертує Firestore DocumentSnapshot у Project об'єкт.
   */
  private docToProject(d: any): Project {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date()
    } as Project;
  }
}
