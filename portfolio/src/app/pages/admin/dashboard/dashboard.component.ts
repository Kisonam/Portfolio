import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { ProjectService } from '../../../services/project.service';
import { ToolsService } from '../../../services/tools.service';
import { AboutService } from '../../../services/about.service';
import { Post } from '../../../models/post.model';
import { Project } from '../../../models/project.model';
import { Tool } from '../../../models/tool.model';
import { AboutContent } from '../../../models/about.model';
import { I18nService } from '../../../services/i18n.service';

/**
 * Адмін-дашборд — головна сторінка адмін-панелі.
 * Відображає списки всіх постів, проєктів, інструментів та профілів.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private projectService = inject(ProjectService);
  private toolsService = inject(ToolsService);
  private aboutService = inject(AboutService);
  private router = inject(Router);
  i18n = inject(I18nService);

  posts: Post[] = [];
  projects: Project[] = [];
  tools: Tool[] = [];
  profiles: AboutContent[] = [];

  activeTab: 'posts' | 'projects' | 'tools' | 'about' = 'posts';

  /** Inline редагування інструменту */
  editingToolId: string | null = null;
  editingTool: Partial<Tool> = {};
  savingTool = false;

  /** Стан збереження профілю */
  settingActiveProfile = false;

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
    this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
    this.toolsService.tools$.subscribe(tools => this.tools = tools);
    this.aboutService.profiles$.subscribe(profiles => this.profiles = profiles);
  }

  getTitle(item: Post | Project): string {
    if (item.translations) {
      const title = item.translations.uk?.title ||
                    item.translations.pl?.title ||
                    item.translations.en?.title;
      if (title) return title;
    }
    const oldItem = item as any;
    return oldItem.title || 'Untitled';
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  async deletePost(post: Post) {
    if (confirm(`Видалити пост "${this.getTitle(post)}"?`)) {
      await this.postService.deletePost(post.id!);
    }
  }

  async deleteProject(project: Project) {
    if (confirm(`Видалити проєкт "${this.getTitle(project)}"?`)) {
      await this.projectService.deleteProject(project.id!);
    }
  }

  /* ===== Tools ===== */

  startEditTool(tool: Tool) {
    this.editingToolId = tool.id!;
    this.editingTool = { ...tool };
  }

  cancelEditTool() {
    this.editingToolId = null;
    this.editingTool = {};
  }

  async saveEditTool() {
    if (!this.editingToolId) return;
    this.savingTool = true;
    try {
      await this.toolsService.saveTool(this.editingTool as Tool);
      this.editingToolId = null;
      this.editingTool = {};
    } finally {
      this.savingTool = false;
    }
  }

  async deleteTool(tool: Tool) {
    if (confirm(`Видалити "${tool.name}"?`)) {
      await this.toolsService.deleteTool(tool.id!);
    }
  }

  /* ===== About profiles ===== */

  async setActiveProfile(profile: AboutContent) {
    this.settingActiveProfile = true;
    try {
      await this.aboutService.setActiveProfile(profile.id!);
    } finally {
      this.settingActiveProfile = false;
    }
  }

  async deleteProfile(profile: AboutContent) {
    if (confirm(`Видалити профіль "${profile.profileName || profile.id}"?`)) {
      await this.aboutService.deleteProfile(profile.id!);
    }
  }

  getProfileName(profile: AboutContent): string {
    return profile.profileName || profile.translations?.uk?.name || profile.translations?.en?.name || profile.id || 'Профіль';
  }
}
