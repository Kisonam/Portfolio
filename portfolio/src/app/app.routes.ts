import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Маршрути додатку.
 * Публічні маршрути доступні всім, адмін-маршрути захищені authGuard.
 * Використовується lazy loading (loadComponent) для оптимізації завантаження.
 */
export const routes: Routes = [
  /* ===== ПУБЛІЧНІ МАРШРУТИ ===== */

  /** Головна сторінка з Activity Heatmap */
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },

  /** Сторінка блогу — вертикальна стрічка постів */
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },

  /** Деталі поста — повний перегляд одного поста */
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },

  /** Сторінка проєктів — горизонтальна галерея */
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },

  /** Деталі проєкту — повний перегляд з галереєю */
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },

  /** Сторінка пошуку/фільтрації за хештегом (?tag=...) */
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },

  /* ===== АДМІН МАРШРУТИ ===== */

  /** Сторінка логіну адміністратора */
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent)
  },

  /** Адмін-дашборд (захищений authGuard) */
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  /** Форма створення нового поста */
  {
    path: 'admin/post/new',
    loadComponent: () => import('./pages/admin/post-form/post-form.component').then(m => m.PostFormComponent),
    canActivate: [authGuard]
  },

  /** Форма редагування існуючого поста */
  {
    path: 'admin/post/:id',
    loadComponent: () => import('./pages/admin/post-form/post-form.component').then(m => m.PostFormComponent),
    canActivate: [authGuard]
  },

  /** Форма створення нового проєкту */
  {
    path: 'admin/project/new',
    loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent),
    canActivate: [authGuard]
  },

  /** Форма редагування існуючого проєкту */
  {
    path: 'admin/project/:id',
    loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent),
    canActivate: [authGuard]
  },

  /** Перенаправлення невідомих маршрутів на головну */
  {
    path: '**',
    redirectTo: ''
  }
];
