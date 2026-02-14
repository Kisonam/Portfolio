import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityHeatmapComponent } from '../../components/activity-heatmap/activity-heatmap.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { I18nService } from '../../services/i18n.service';
import { PostService } from '../../services/post.service';
import { ProjectService } from '../../services/project.service';
import { ActivityService } from '../../services/activity.service';
import { Post } from '../../models/post.model';
import { Project } from '../../models/project.model';
import { ActivityEvent } from '../../models/activity.model';

/**
 * Головна сторінка сайту.
 * Відображає календар активності, актуальні пости/проєкти та останню активність.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ActivityHeatmapComponent, PostCardComponent, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  i18n = inject(I18nService);
  private postService = inject(PostService);
  private projectService = inject(ProjectService);
  private activityService = inject(ActivityService);

  /** Актуальні (featured) пости */
  featuredPosts: Post[] = [];

  /** Актуальні (featured) проєкти */
  featuredProjects: Project[] = [];

  /** Остання активність */
  lastActivity: { date: string; event: ActivityEvent }[] = [];

  ngOnInit() {
    /** Завантажуємо featured пости (до 4) */
    this.postService.getPosts().subscribe(posts => {
      this.featuredPosts = posts.filter(p => p.featured).slice(0, 4);
    });

    /** Завантажуємо featured проєкти (до 4) */
    this.projectService.getProjects().subscribe(projects => {
      this.featuredProjects = projects.filter(p => p.featured).slice(0, 4);
    });

    /** Завантажуємо останню активність */
    this.activityService.getLastActivity().subscribe(activity => {
      this.lastActivity = activity;
    });
  }
}
