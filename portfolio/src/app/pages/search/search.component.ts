import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ProjectService } from '../../services/project.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Post } from '../../models/post.model';
import { Project } from '../../models/project.model';
import { I18nService } from '../../services/i18n.service';

/**
 * Сторінка результатів пошуку/фільтрації за хештегом.
 * Відображає контент обох типів (пости + проєкти), згрупований за тегом.
 * Тег передається через Query Parameter: ?tag=web-dev
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, PostCardComponent, ProjectCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private projectService = inject(ProjectService);
  i18n = inject(I18nService);

  /** Поточний тег для фільтрації */
  currentTag = '';

  /** Відфільтровані пости */
  posts: Post[] = [];

  /** Відфільтровані проєкти */
  projects: Project[] = [];

  /** Стан завантаження */
  loading = true;

  ngOnInit() {
    /** Підписуємось на зміни Query Parameters (реагуємо на ?tag=...) */
    this.route.queryParams.subscribe(params => {
      this.currentTag = params['tag'] || '';
      if (this.currentTag) {
        this.loading = true;
        this.loadFilteredContent();
      }
    });
  }

  /**
   * Завантажує пости та проєкти, відфільтровані за поточним тегом.
   */
  private loadFilteredContent() {
    /** Завантажуємо пости за тегом */
    this.postService.getPostsByTag(this.currentTag).subscribe(posts => {
      this.posts = posts;
      this.checkLoading();
    });

    /** Завантажуємо проєкти за тегом */
    this.projectService.getProjectsByTag(this.currentTag).subscribe(projects => {
      this.projects = projects;
      this.checkLoading();
    });
  }

  /** Перевіряємо, чи завершилось завантаження обох типів контенту */
  private checkLoading() {
    if (this.posts !== undefined && this.projects !== undefined) {
      this.loading = false;
    }
  }
}
