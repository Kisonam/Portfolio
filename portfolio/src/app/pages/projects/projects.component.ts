import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { I18nService } from '../../services/i18n.service';

/**
 * Сторінка проєктів — горизонтальна галерея.
 * Використовує CSS scroll-snap для плавної фіксації карток при гортанні.
 * Кожна картка проєкту займає значну частину екрана.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  i18n = inject(I18nService);

  /** Закріплені (featured) проєкти */
  featuredProjects: Project[] = [];

  /** Звичайні проєкти */
  projects: Project[] = [];

  /** Стан завантаження */
  loading = true;

  ngOnInit() {
    /** Підписуємось на потік опублікованих проєктів */
    this.projectService.getProjects().subscribe(projects => {
      this.featuredProjects = projects.filter(p => p.featured);
      this.projects = projects.filter(p => !p.featured);
      this.loading = false;
    });
  }
}
