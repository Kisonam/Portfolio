import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { PageVisibility } from '../models/settings.model';

export const pageVisibilityGuard: CanActivateFn = (route, state) => {
  const settingsService = inject(SettingsService);
  const router = inject(Router);

  // Визначаємо яку сторінку перевіряємо на основі URL
  let page: keyof PageVisibility | null = null;
  
  if (state.url.startsWith('/blog')) {
    page = 'blog';
  } else if (state.url.startsWith('/projects')) {
    page = 'projects';
  } else if (state.url.startsWith('/about')) {
    page = 'about';
  }

  // Якщо це не одна з контрольованих сторінок, дозволяємо доступ
  if (!page) {
    return true;
  }

  // Перевіряємо чи сторінка видима
  const isVisible = settingsService.isPageVisible(page);
  
  if (!isVisible) {
    // Якщо сторінка прихована, перенаправляємо на головну
    router.navigate(['/']);
    return false;
  }

  return true;
};
