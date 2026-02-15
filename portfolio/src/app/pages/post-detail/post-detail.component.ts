import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { I18nService } from '../../services/i18n.service';
import { marked } from 'marked';

/**
 * Сторінка повного перегляду одного поста.
 * Завантажує пост за ID з URL-параметра та рендерить Markdown-контент як HTML.
 */
@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  i18n = inject(I18nService);

  /** Поточний пост */
  post: Post | undefined;

  /** HTML-контент поста (конвертований з Markdown) */
  renderedContent = '';

  /** Стан завантаження */
  loading = true;

  ngOnInit() {
    /** Отримуємо ID поста з URL-параметра (наприклад, /blog/abc123) */
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe(post => {
        this.post = post;
        if (post) {
          /** Конвертуємо Markdown у HTML для відображення */
          const translation = this.getTranslation(post);
          this.renderedContent = marked(translation.content) as string;
        }
        this.loading = false;
      });

      /** Підписуємось на зміну мови для реактивного оновлення контенту */
      this.i18n.lang$.subscribe(() => {
        if (this.post) {
          const translation = this.getTranslation(this.post);
          this.renderedContent = marked(translation.content) as string;
        }
      });
    }
  }

  /**
   * Отримує переклад контенту відповідно до обраної мови інтерфейсу.
   */
  getTranslation(post: Post) {
    if (!post.translations) {
      return {
        title: post.title || 'Untitled',
        shortDescription: post.shortDescription || '',
        content: post.content || ''
      };
    }

    const currentLang = this.i18n.currentLang;

    if (post.translations[currentLang]) {
      return post.translations[currentLang]!;
    }

    if (post.availableLanguages && post.availableLanguages.length > 0) {
      const firstAvailableLang = post.availableLanguages[0];
      return post.translations[firstAvailableLang as 'uk' | 'pl' | 'en']!;
    }

    return post.translations.uk ||
           post.translations.pl ||
           post.translations.en ||
           {
             title: post.title || 'Untitled',
             shortDescription: post.shortDescription || '',
             content: post.content || ''
           };
  }
}
