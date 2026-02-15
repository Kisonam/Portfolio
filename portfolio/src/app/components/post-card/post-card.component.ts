import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post, PostTranslation } from '../../models/post.model';
import { I18nService } from '../../services/i18n.service';

/**
 * Компонент картки поста для прев'ю у стрічці блогу.
 * Відображає контент відповідно до обраної мови інтерфейсу.
 */
@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  private i18n = inject(I18nService);

  /** Пост для відображення — передається з батьківського компонента */
  @Input({ required: true }) post!: Post;

  /**
   * Отримує переклад контенту відповідно до обраної мови інтерфейсу.
   * Якщо переклад для обраної мови відсутній, повертає першу доступну мову.
   */
  getTranslation(): PostTranslation {
    // Перевірка на існування translations (для сумісності зі старими даними)
    if (!this.post.translations) {
      // Використовуємо старі поля як fallback
      return {
        title: this.post.title || 'Untitled',
        shortDescription: this.post.shortDescription || '',
        content: this.post.content || ''
      };
    }

    const currentLang = this.i18n.currentLang;

    // Спробувати отримати переклад для поточної мови
    if (this.post.translations[currentLang]) {
      return this.post.translations[currentLang]!;
    }

    // Fallback: повернути першу доступну мову
    if (this.post.availableLanguages && this.post.availableLanguages.length > 0) {
      const firstAvailableLang = this.post.availableLanguages[0];
      return this.post.translations[firstAvailableLang as 'uk' | 'pl' | 'en']!;
    }

    // Якщо немає availableLanguages, спробувати uk -> pl -> en
    return this.post.translations.uk ||
           this.post.translations.pl ||
           this.post.translations.en ||
           // Останній fallback на старі поля
           {
             title: this.post.title || 'Untitled',
             shortDescription: this.post.shortDescription || '',
             content: this.post.content || ''
           };
  }
}
