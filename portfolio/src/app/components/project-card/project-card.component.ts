import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';

/**
 * Компонент картки проєкту для горизонтальної галереї.
 * Відображає: головне фото, назву, короткий опис та хештеги.
 * Кожна картка займає значну частину екрана (scroll-snap).
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  /** Проєкт для відображення — передається з батьківського компонента */
  @Input({ required: true }) project!: Project;
}
