import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../services/about.service';
import { I18nService } from '../../services/i18n.service';
import { AboutContent, AboutTranslation } from '../../models/about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  about: AboutContent | null = null;
  loading = true;

  constructor(
    public i18n: I18nService,
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {
    this.aboutService.about$.subscribe(about => {
      this.about = about;
      this.loading = false;
    });
  }

  getTranslation(): AboutTranslation {
    const lang = this.i18n.currentLang;
    return this.about?.translations?.[lang] ?? this.about?.translations?.['en'] ?? {
      name: '',
      title: '',
      bio: ''
    };
  }
}
