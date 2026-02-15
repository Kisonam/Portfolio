import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { ProjectService } from '../../../services/project.service';
import { Post } from '../../../models/post.model';
import { Project } from '../../../models/project.model';
import { I18nService } from '../../../services/i18n.service';

/**
 * Адмін-дашборд — головна сторінка адмін-панелі.
 * Відображає списки всіх постів і проєктів (включно з чернетками).
 * Дозволяє створювати, редагувати та видаляти контент.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  i18n = inject(I18nService);

  /** Всі пости (включно з чернетками) */
  posts: Post[] = [];

  /** Всі проєкти (включно з чернетками) */
  projects: Project[] = [];

  /** Активна вкладка: 'posts' або 'projects' */
  activeTab: 'posts' | 'projects' = 'posts';

  ngOnInit() {
    /** Завантажуємо ВСІ пости та проєкти для адмін-панелі */
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
    this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
  }

  /** Отримати назву з translations або старого поля title */
  getTitle(item: Post | Project): string {
    // Спочатку перевіряємо translations
    if (item.translations) {
      const title = item.translations.uk?.title ||
                    item.translations.pl?.title ||
                    item.translations.en?.title;
      if (title) return title;
    }

    // Fallback на старе поле title для зворотної сумісності
    const oldItem = item as any;
    return oldItem.title || 'Untitled';
  }

  /** Вихід з акаунту адміна */
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  /** Видалити пост з підтвердженням */
  async deletePost(post: Post) {
    if (confirm(`Видалити пост "${this.getTitle(post)}"?`)) {
      await this.postService.deletePost(post.id!);
    }
  }

  /** Видалити проєкт з підтвердженням */
  async deleteProject(project: Project) {
    if (confirm(`Видалити проєкт "${this.getTitle(project)}"?`)) {
      await this.projectService.deleteProject(project.id!);
    }
  }
}
