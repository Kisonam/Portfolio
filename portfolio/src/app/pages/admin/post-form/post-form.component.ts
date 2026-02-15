import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { I18nService, Lang } from '../../../services/i18n.service';

/**
 * Компонент форми створення/редагування поста.
 * Підтримує мультимовний контент — можна заповнити переклади на uk, pl, en.
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

  /** Активна вкладка мови для редагування */
  activeTab: Lang = 'uk';

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
      published: [false],
      featured: [false]
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
   */
  private loadPost(id: string) {
    this.postService.getPostById(id).subscribe(post => {
      if (post) {
        this.form.patchValue({
          coverImage: post.coverImage,
          titleUk: post.translations.uk?.title || '',
          shortDescriptionUk: post.translations.uk?.shortDescription || '',
          contentUk: post.translations.uk?.content || '',
          titlePl: post.translations.pl?.title || '',
          shortDescriptionPl: post.translations.pl?.shortDescription || '',
          contentPl: post.translations.pl?.content || '',
          titleEn: post.translations.en?.title || '',
          shortDescriptionEn: post.translations.en?.shortDescription || '',
          contentEn: post.translations.en?.content || '',
          published: post.published,
          featured: post.featured || false
        });

        // Встановлюємо вибрані мови
        this.selectedLanguages = {
          uk: !!post.translations.uk,
          pl: !!post.translations.pl,
          en: !!post.translations.en
        };

        this.tagsInput = post.tags.join(', ');
        this.authorsInput = post.authors.join(', ');
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
   */
  async onSave() {
    this.saving = true;

    /** Парсимо теги та авторів */
    const tags = this.tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const authors = this.authorsInput
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

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

    const postData = {
      coverImage: this.form.value.coverImage,
      translations,
      availableLanguages,
      tags,
      authors,
      published: this.form.value.published,
      featured: this.form.value.featured
    };

    try {
      if (this.isEditMode && this.postId) {
        await this.postService.updatePost(this.postId, postData);
      } else {
        await this.postService.createPost(postData);
      }
      this.router.navigate(['/admin/dashboard']);
    } catch (err) {
      console.error('Помилка збереження поста:', err);
    } finally {
      this.saving = false;
    }
  }
}
