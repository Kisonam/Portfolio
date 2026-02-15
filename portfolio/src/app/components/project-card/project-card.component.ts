import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, ProjectTranslation } from '../../models/project.model';
import { I18nService } from '../../services/i18n.service';

/**
 * Компонент картки проєкту для галереї.
 * Відображає контент відповідно до обраної мови інтерфейсу.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  private i18n = inject(I18nService);

  /** Проєкт для відображення — передається з батьківського компонента */
  @Input({ required: true }) project!: Project;

  /**
   * Отримує переклад контенту відповідно до обраної мови інтерфейсу.
   * Якщо переклад для обраної мови відсутній, повертає першу доступну мову.
   */
  getTranslation(): ProjectTranslation {
    // Перевірка на існування translations (для сумісності зі старими даними)
    if (!this.project.translations) {
      return {
        title: this.project.title || 'Untitled',
        shortDescription: this.project.shortDescription || '',
        content: this.project.content || ''
      };
    }

    const currentLang = this.i18n.currentLang;

    // Спробувати отримати переклад для поточної мови
    if (this.project.translations[currentLang]) {
      return this.project.translations[currentLang]!;
    }

    // Fallback: повернути першу доступну мову
    if (this.project.availableLanguages && this.project.availableLanguages.length > 0) {
      const firstAvailableLang = this.project.availableLanguages[0];
      return this.project.translations[firstAvailableLang as 'uk' | 'pl' | 'en']!;
    }

    // Якщо немає availableLanguages, спробувати uk -> pl -> en
    return this.project.translations.uk ||
           this.project.translations.pl ||
           this.project.translations.en ||
           {
             title: this.project.title || 'Untitled',
             shortDescription: this.project.shortDescription || '',
             content: this.project.content || ''
           };
  }
}
