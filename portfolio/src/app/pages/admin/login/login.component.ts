import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { I18nService } from '../../../services/i18n.service';

/**
 * Компонент сторінки логіну адміністратора.
 * Використовує Firebase Auth (Email/Password) для автентифікації.
 * Після успішного логіну перенаправляє на адмін-дашборд.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  i18n = inject(I18nService);

  /** Поля форми логіну */
  email = '';
  password = '';

  /** Повідомлення про помилку */
  error = '';

  /** Стан завантаження (під час запиту) */
  loading = false;

  /**
   * Обробник форми логіну.
   * Відправляє email/password на Firebase Auth.
   */
  async onLogin() {
    this.error = '';
    this.loading = true;

    try {
      await this.authService.login(this.email, this.password);
      /** Успішний логін — перенаправляємо на адмін-дашборд */
      this.router.navigate(['/admin/dashboard']);
    } catch (err: unknown) {
      /** Помилка логіну — показуємо повідомлення */
      const error = err as { code?: string };
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.error = 'Невірний email або пароль';
      } else if (error.code === 'auth/invalid-credential') {
        this.error = 'Невірні облікові дані';
      } else {
        this.error = 'Помилка входу. Спробуйте ще раз.';
      }
    } finally {
      this.loading = false;
    }
  }
}
