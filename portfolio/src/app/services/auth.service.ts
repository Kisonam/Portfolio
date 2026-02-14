import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { auth } from './firebase.init';

/**
 * Сервіс автентифікації.
 * Відповідає за логін/логаут адміністратора через Firebase Auth (Email/Password).
 * Використовує native firebase/auth SDK для уникнення конфліктів з @angular/fire.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Observable поточного користувача (null якщо не залогінений) */
  user$: Observable<User | null> = new Observable<User | null>(observer => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      observer.next(user);
    }, err => observer.error(err));
    return () => unsubscribe();
  });

  /**
   * Логін адміністратора через email та пароль.
   * @param email — email адміна
   * @param password — пароль адміна
   * @returns Promise з UserCredential
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Вихід з акаунту адміна.
   * @returns Promise<void>
   */
  logout() {
    return signOut(auth);
  }
}
