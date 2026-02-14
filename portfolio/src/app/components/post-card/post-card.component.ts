import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.model';

/**
 * Компонент картки поста для прев'ю у стрічці блогу.
 * Відображає: головне фото, назву, короткий опис, дату, авторів та хештеги.
 * При натисканні переходить на повну сторінку поста.
 */
@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  /** Пост для відображення — передається з батьківського компонента */
  @Input({ required: true }) post!: Post;
}
