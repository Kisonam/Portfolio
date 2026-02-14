import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { I18nService } from '../../services/i18n.service';

/**
 * Сторінка блогу — вертикальна стрічка постів.
 * Завантажує всі опубліковані пости з Firestore та відображає їх як картки.
 * Класичний вертикальний скрол.
 */
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private postService = inject(PostService);
  i18n = inject(I18nService);

  /** Закріплені (featured) пости */
  featuredPosts: Post[] = [];

  /** Звичайні пости */
  posts: Post[] = [];

  /** Стан завантаження */
  loading = true;

  ngOnInit() {
    /** Підписуємось на потік опублікованих постів */
    this.postService.getPosts().subscribe(posts => {
      this.featuredPosts = posts.filter(p => p.featured);
      this.posts = posts.filter(p => !p.featured);
      this.loading = false;
    });
  }
}
