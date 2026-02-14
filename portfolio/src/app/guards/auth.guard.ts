import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Guard для захисту адмін-маршрутів.
 * Перевіряє, чи користувач залогінений через Firebase Auth.
 * Якщо ні — перенаправляє на сторінку логіну (/admin/login).
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(currentUser => {
      if (currentUser) {
        /** Користувач залогінений — дозволяємо доступ */
        return true;
      }
      /** Не залогінений — перенаправляємо на логін */
      return router.createUrlTree(['/admin/login']);
    })
  );
};
