/**
 * Ініціалізація Firebase через native SDK.
 * Створюємо єдиний екземпляр FirebaseApp, Firestore та Auth,
 * щоб уникнути конфлікту між @angular/fire обгортками та native SDK.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { environment } from '../../environments/environment';

/** Ініціалізуємо Firebase App (або беремо існуючий, якщо вже створений) */
const app = getApps().length === 0
  ? initializeApp(environment.firebaseConfig)
  : getApp();

/** Єдиний екземпляр Firestore для всього додатку */
export const db: Firestore = getFirestore(app);

/** Єдиний екземпляр Auth для всього додатку */
export const auth: Auth = getAuth(app);
