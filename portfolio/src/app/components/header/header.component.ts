import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService, Lang } from '../../services/i18n.service';
import { SettingsService } from '../../services/settings.service';

/**
 * Компонент шапки сайту.
 * Містить навігаційне меню з посиланнями на головні секції:
 * - Головна (з Activity Heatmap)
 * - Блог (вертикальна стрічка постів)
 * - Проєкти (горизонтальна галерея)
 * Також містить перемикач мов (UK / PL / EN).
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /** Сервіс інтернаціоналізації */
  i18n = inject(I18nService);

  /** Сервіс налаштувань */
  settingsService = inject(SettingsService);

  /** Стан мобільного меню (відкрите/закрите) */
  menuOpen = false;

  /** Стан dropdown меню мов (відкрите/закрите) */
  langDropdownOpen = false;

  /** Доступні мови */
  langs: Lang[] = ['uk', 'pl', 'en'];

  /** Перемикач мобільного меню */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /** Перемикач dropdown меню мов */
  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  /** Змінити мову інтерфейсу */
  setLang(lang: Lang) {
    this.i18n.setLang(lang);
    this.langDropdownOpen = false; // Закриваємо dropdown після вибору
  }
}
