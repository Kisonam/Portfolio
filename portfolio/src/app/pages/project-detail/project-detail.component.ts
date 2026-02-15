import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { I18nService } from '../../services/i18n.service';
import { marked } from 'marked';

/**
 * Сторінка повного перегляду одного проєкту.
 * Завантажує проєкт за ID з URL-параметра.
 * Відображає галерею додаткових фото, опис, посилання та хештеги.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  i18n = inject(I18nService);

  /** Поточний проєкт */
  project: Project | undefined;

  /** HTML-контент проєкту (конвертований з Markdown) */
  renderedContent = '';

  /** Стан завантаження */
  loading = true;

  /** Індекс поточного фото в галереї */
  currentImageIndex = 0;

  ngOnInit() {
    /** Отримуємо ID проєкту з URL-параметра (наприклад, /projects/abc123) */
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe(project => {
        this.project = project;
        if (project) {
          const translation = this.getTranslation(project);
          this.renderedContent = marked(translation.content) as string;
        }
        this.loading = false;
      });

      /** Підписуємось на зміну мови для реактивного оновлення контенту */
      this.i18n.lang$.subscribe(() => {
        if (this.project) {
          const translation = this.getTranslation(this.project);
          this.renderedContent = marked(translation.content) as string;
        }
      });
    }
  }

  /**
   * Отримує переклад контенту відповідно до обраної мови інтерфейсу.
   */
  getTranslation(project: Project) {
    if (!project.translations) {
      return {
        title: project.title || 'Untitled',
        shortDescription: project.shortDescription || '',
        content: project.content || ''
      };
    }

    const currentLang = this.i18n.currentLang;

    if (project.translations[currentLang]) {
      return project.translations[currentLang]!;
    }

    if (project.availableLanguages && project.availableLanguages.length > 0) {
      const firstAvailableLang = project.availableLanguages[0];
      return project.translations[firstAvailableLang as 'uk' | 'pl' | 'en']!;
    }

    return project.translations.uk ||
           project.translations.pl ||
           project.translations.en ||
           {
             title: project.title || 'Untitled',
             shortDescription: project.shortDescription || '',
             content: project.content || ''
           };
  }

  /** Перейти до наступного фото в галереї */
  nextImage() {
    if (this.project && this.project.gallery.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.project.gallery.length;
    }
  }

  /** Перейти до попереднього фото в галереї */
  prevImage() {
    if (this.project && this.project.gallery.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.project.gallery.length) % this.project.gallery.length;
    }
  }

  /** Перейти до конкретного фото в галереї */
  goToImage(index: number) {
    this.currentImageIndex = index;
  }
}
