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
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { db } from './firebase.init';

/**
 * Сервіс для роботи з блог-постами.
 * Виконує CRUD-операції з колекцією 'posts' у Firestore.
 * Використовує native firebase/firestore SDK для уникнення конфліктів з @angular/fire.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {

  /**
   * Отримати всі опубліковані пости, відсортовані за датою (найновіші першими).
   * Використовується на публічній сторінці блогу.
   */
  getPosts(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      /** onSnapshot — підписка на реальний час */
      const unsubscribe = onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(d => this.docToPost(d));
        observer.next(posts);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати ВСІ пости (включно з чернетками) — для адмін-панелі.
   */
  getAllPosts(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(d => this.docToPost(d));
        observer.next(posts);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати один пост за його ID.
   * @param id — ідентифікатор документа у Firestore
   */
  getPostById(id: string): Observable<Post | undefined> {
    return new Observable<Post | undefined>(observer => {
      const docRef = doc(db, 'posts', id);
      const unsubscribe = onSnapshot(docRef, snapshot => {
        if (snapshot.exists()) {
          observer.next(this.docToPost(snapshot));
        } else {
          observer.next(undefined);
        }
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Отримати пости за тегом (для фільтрації по хештегу).
   * @param tag — хештег для фільтрації
   */
  getPostsByTag(tag: string): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('tags', 'array-contains', tag)
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(d => this.docToPost(d));
        observer.next(posts);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }

  /**
   * Створити новий пост (адмін-панель).
   * Автоматично додає createdAt та updatedAt.
   * @param post — дані нового поста (без id)
   */
  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Timestamp.now();
    return addDoc(collection(db, 'posts'), {
      ...post,
      createdAt: now,
      updatedAt: now
    });
  }

  /**
   * Оновити існуючий пост (адмін-панель).
   * Автоматично оновлює updatedAt.
   * @param id — ідентифікатор поста
   * @param post — часткові дані для оновлення
   */
  updatePost(id: string, post: Partial<Post>) {
    const postDoc = doc(db, 'posts', id);
    return updateDoc(postDoc, {
      ...post,
      updatedAt: Timestamp.now()
    });
  }

  /**
   * Видалити пост (адмін-панель).
   * @param id — ідентифікатор поста
   */
  deletePost(id: string) {
    return deleteDoc(doc(db, 'posts', id));
  }

  /**
   * Конвертує Firestore DocumentSnapshot у Post об'єкт.
   * Firestore зберігає дати як Timestamp об'єкти, а нам потрібні Date.
   */
  private docToPost(d: any): Post {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date()
    } as Post;
  }
}
