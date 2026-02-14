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

  ngOnInit() {
    /** Ініціалізуємо форму з валідацією */
    this.form = this.fb.group({
      title: ['', Validators.required],
      coverImage: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      liveUrl: [''],
      repoUrl: [''],
      published: [false],
      featured: [false],
      lang: ['uk'],
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
        this.form.patchValue({
          title: project.title,
          coverImage: project.coverImage,
          shortDescription: project.shortDescription,
          content: project.content,
          liveUrl: project.liveUrl || '',
          repoUrl: project.repoUrl || '',
          published: project.published,
          featured: project.featured || false,
          lang: project.lang || 'uk',
          projectDate: project.projectDate || ''
        });
        this.tagsInput = project.tags.join(', ');
        this.authorsInput = project.authors.join(', ');
        this.galleryInput = project.gallery.join('\n');
      }
    });
  }

  /**
   * Обробник збереження форми.
   * Створює новий проєкт або оновлює існуючий.
   */
  async onSave() {
    if (this.form.invalid) return;
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

    const projectData = {
      ...this.form.value,
      tags,
      authors,
      gallery
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
