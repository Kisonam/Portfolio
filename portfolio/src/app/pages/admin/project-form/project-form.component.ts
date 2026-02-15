import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { I18nService, Lang } from '../../../services/i18n.service';

/**
 * Компонент форми створення/редагування проєкту.
 * Використовує ReactiveForms для валідації та керування даними.
 * Якщо в URL є :id — режим редагування, інакше — створення нового проєкту.
 */
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  i18n = inject(I18nService);

  /** Доступні мови контенту */
  langs: Lang[] = ['uk', 'pl', 'en'];

  /** Активна вкладка мови для редагування */
  activeTab: Lang = 'uk';

  /** Reactive форма проєкту */
  form!: FormGroup;

  /** ID проєкту (null якщо створення нового) */
  projectId: string | null = null;

  /** Чи це режим редагування */
  isEditMode = false;

  /** Стан збереження */
  saving = false;

  /** Рядок для введення тегів (через кому) */
  tagsInput = '';

  /** Рядок для введення авторів (через кому) */
  authorsInput = '';

  /** Рядок для введення URL галереї (через кому або по рядку) */
  galleryInput = '';

  /** Вибрані мови для заповнення */
  selectedLanguages: { [key: string]: boolean } = {
    uk: true,
    pl: false,
    en: false
  };

  ngOnInit() {
    /** Ініціалізуємо форму з валідацією для кожної мови */
    this.form = this.fb.group({
      coverImage: ['', Validators.required],
      // Українська
      titleUk: [''],
      shortDescriptionUk: [''],
      contentUk: [''],
      // Польська
      titlePl: [''],
      shortDescriptionPl: [''],
      contentPl: [''],
      // Англійська
      titleEn: [''],
      shortDescriptionEn: [''],
      contentEn: [''],
      // Інші поля
      liveUrl: [''],
      repoUrl: [''],
      published: [false],
      featured: [false],
      projectDate: ['']
    });

    /** Перевіряємо, чи є ID в URL (режим редагування) */
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId && this.projectId !== 'new') {
      this.isEditMode = true;
      this.loadProject(this.projectId);
    }
  }

  /**
   * Завантажує дані проєкту для редагування.
   * @param id — ідентифікатор проєкту
   */
  private loadProject(id: string) {
    this.projectService.getProjectById(id).subscribe(project => {
      if (project) {
        // Fallback на старі поля для зворотної сумісності
        const oldProject = project as any;

        this.form.patchValue({
          coverImage: project.coverImage,
          titleUk: project.translations?.uk?.title || oldProject.title || '',
          shortDescriptionUk: project.translations?.uk?.shortDescription || oldProject.shortDescription || '',
          contentUk: project.translations?.uk?.content || oldProject.content || '',
          titlePl: project.translations?.pl?.title || '',
          shortDescriptionPl: project.translations?.pl?.shortDescription || '',
          contentPl: project.translations?.pl?.content || '',
          titleEn: project.translations?.en?.title || '',
          shortDescriptionEn: project.translations?.en?.shortDescription || '',
          contentEn: project.translations?.en?.content || '',
          liveUrl: project.liveUrl || '',
          repoUrl: project.repoUrl || '',
          published: project.published,
          featured: project.featured || false,
          projectDate: project.projectDate || ''
        });

        // Встановлюємо вибрані мови
        this.selectedLanguages = {
          uk: !!project.translations?.uk || !!(oldProject.title),
          pl: !!project.translations?.pl,
          en: !!project.translations?.en
        };

        this.tagsInput = project.tags?.join(', ') || '';
        this.authorsInput = project.authors?.join(', ') || '';
        this.galleryInput = project.gallery?.join('\n') || '';
      }
    });
  }

  /**
   * Перемикання вкладки мови
   */
  switchTab(lang: Lang) {
    this.activeTab = lang;
  }

  /**
   * Обробник збереження форми.
   * Створює новий проєкт або оновлює існуючий.
   */
  async onSave() {
    this.saving = true;

    /** Парсимо теги, авторів та галерею з рядків */
    const tags = this.tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const authors = this.authorsInput
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    /** Галерея — кожен URL на новому рядку */
    const gallery = this.galleryInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    /** Збираємо переклади */
    const translations: any = {};
    const availableLanguages: string[] = [];

    if (this.selectedLanguages['uk'] && this.form.value.titleUk) {
      translations.uk = {
        title: this.form.value.titleUk,
        shortDescription: this.form.value.shortDescriptionUk,
        content: this.form.value.contentUk
      };
      availableLanguages.push('uk');
    }

    if (this.selectedLanguages['pl'] && this.form.value.titlePl) {
      translations.pl = {
        title: this.form.value.titlePl,
        shortDescription: this.form.value.shortDescriptionPl,
        content: this.form.value.contentPl
      };
      availableLanguages.push('pl');
    }

    if (this.selectedLanguages['en'] && this.form.value.titleEn) {
      translations.en = {
        title: this.form.value.titleEn,
        shortDescription: this.form.value.shortDescriptionEn,
        content: this.form.value.contentEn
      };
      availableLanguages.push('en');
    }

    // Перевірка: хоча б одна мова має бути заповнена
    if (availableLanguages.length === 0) {
      alert('Заповніть хоча б одну мову!');
      this.saving = false;
      return;
    }

    const projectData = {
      coverImage: this.form.value.coverImage,
      translations,
      availableLanguages,
      tags,
      authors,
      gallery,
      liveUrl: this.form.value.liveUrl,
      repoUrl: this.form.value.repoUrl,
      published: this.form.value.published,
      featured: this.form.value.featured,
      projectDate: this.form.value.projectDate
    };

    try {
      if (this.isEditMode && this.projectId) {
        await this.projectService.updateProject(this.projectId, projectData);
      } else {
        await this.projectService.createProject(projectData);
      }
      this.router.navigate(['/admin/dashboard']);
    } catch (err) {
      console.error('Помилка збереження проєкту:', err);
    } finally {
      this.saving = false;
    }
  }
}
