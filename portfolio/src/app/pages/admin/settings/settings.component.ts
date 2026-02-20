import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SettingsService } from '../../../services/settings.service';
import { I18nService } from '../../../services/i18n.service';
import { SiteSettings, PageVisibility } from '../../../models/settings.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: SiteSettings | null = null;
  saving = false;
  saveMessage = '';

  constructor(
    public i18n: I18nService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
    });
  }

  async togglePageVisibility(page: keyof PageVisibility): Promise<void> {
    if (!this.settings) return;

    this.saving = true;
    this.saveMessage = '';

    try {
      const newValue = !this.settings.pageVisibility[page];
      await this.settingsService.updatePageVisibility(page, newValue);
      this.saveMessage = this.i18n.t('settings.saved');
      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      this.saveMessage = this.i18n.t('settings.error');
    } finally {
      this.saving = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
