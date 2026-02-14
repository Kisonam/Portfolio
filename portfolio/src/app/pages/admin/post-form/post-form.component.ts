import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { I18nService, Lang } from '../../../services/i18n.service';

/**
 * Компонент форми створення/редагування поста.
 * Використовує ReactiveForms для валідації та керування даними.
 * Якщо в URL є :id — режим редагування, інакше — створення нового поста.
 */
@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  i18n = inject(I18nService);

  /** Доступні мови контенту */
  langs: Lang[] = ['uk', 'pl', 'en'];

  /** Обрана мова контенту */
  selectedLang: Lang = 'uk';

  /** Reactive форма поста */
  form!: FormGroup;

  /** ID поста (null якщо створення нового) */
  postId: string | null = null;

  /** Чи це режим редагування */
  isEditMode = false;

  /** Стан збереження */
  saving = false;

  /** Рядок для введення тегів (через кому) */
  tagsInput = '';

  /** Рядок для введення авторів (через кому) */
  authorsInput = '';

  ngOnInit() {
    /** Ініціалізуємо форму з валідацією */
    this.form = this.fb.group({
      title: ['', Validators.required],
      coverImage: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      published: [false],
      featured: [false],
      lang: ['uk']
    });

    /** Перевіряємо, чи є ID в URL (режим редагування) */
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId && this.postId !== 'new') {
      this.isEditMode = true;
      this.loadPost(this.postId);
    }
  }

  /**
   * Завантажує дані поста для редагування.
   * @param id — ідентифікатор поста
   */
  private loadPost(id: string) {
    this.postService.getPostById(id).subscribe(post => {
      if (post) {
        this.form.patchValue({
          title: post.title,
          coverImage: post.coverImage,
          shortDescription: post.shortDescription,
          content: post.content,
          published: post.published,
          featured: post.featured || false,
          lang: post.lang || 'uk'
        });
        this.selectedLang = (post.lang as Lang) || 'uk';
        this.tagsInput = post.tags.join(', ');
        this.authorsInput = post.authors.join(', ');
      }
    });
  }

  /**
   * Обробник збереження форми.
   * Створює новий пост або оновлює існуючий.
   */
  async onSave() {
    if (this.form.invalid) return;
    this.saving = true;

    /** Парсимо теги та авторів з рядків (розділені комою) */
    const tags = this.tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const authors = this.authorsInput
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    const postData = {
      ...this.form.value,
      tags,
      authors
    };

    try {
      if (this.isEditMode && this.postId) {
        /** Оновлюємо існуючий пост */
        await this.postService.updatePost(this.postId, postData);
      } else {
        /** Створюємо новий пост */
        await this.postService.createPost(postData);
      }
      /** Повертаємось на дашборд після збереження */
      this.router.navigate(['/admin/dashboard']);
    } catch (err) {
      console.error('Помилка збереження поста:', err);
    } finally {
      this.saving = false;
    }
  }
}
