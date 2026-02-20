import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { I18nService } from '../../../services/i18n.service';
import { AboutContent, AboutSkillGroup, AboutExperience, AboutEducation } from '../../../models/about.model';

type Lang = 'uk' | 'pl' | 'en';

@Component({
  selector: 'app-about-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.scss'
})
export class AboutFormComponent implements OnInit {
  saving = false;
  deleting = false;
  saveMessage = '';
  isEdit = false;
  activeLang: Lang = 'uk';
  langs: Lang[] = ['uk', 'pl', 'en'];

  form: AboutContent = {
    photo: '',
    profileName: '',
    active: false,
    email: '',
    github: '',
    linkedin: '',
    website: '',
    translations: {
      uk: { name: '', title: '', bio: '', location: '' },
      pl: { name: '', title: '', bio: '', location: '' },
      en: { name: '', title: '', bio: '', location: '' }
    },
    skills: [],
    experience: [],
    education: []
  };

  skillsRaw: { category: string; skillsStr: string }[] = [];

  constructor(
    public i18n: I18nService,
    private aboutService: AboutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.aboutService.profiles$.subscribe(profiles => {
        const profile = profiles.find(p => p.id === id);
        if (profile) {
          this.form = JSON.parse(JSON.stringify(profile));
          this.skillsRaw = (this.form.skills || []).map(g => ({
            category: g.category,
            skillsStr: g.skills.join(', ')
          }));
        }
      });
    }
  }

  addSkillGroup(): void {
    this.skillsRaw.push({ category: '', skillsStr: '' });
  }

  removeSkillGroup(i: number): void {
    this.skillsRaw.splice(i, 1);
  }

  addExperience(): void {
    this.form.experience.push({ company: '', role: '', period: '', description: '' });
  }

  removeExperience(i: number): void {
    this.form.experience.splice(i, 1);
  }

  addEducation(): void {
    this.form.education.push({ institution: '', degree: '', period: '' });
  }

  removeEducation(i: number): void {
    this.form.education.splice(i, 1);
  }

  async save(): Promise<void> {
    this.saving = true;
    this.saveMessage = '';
    try {
      this.form.skills = this.skillsRaw
        .filter(g => g.category.trim())
        .map(g => ({
          category: g.category.trim(),
          skills: g.skillsStr.split(',').map(s => s.trim()).filter(Boolean)
        }));

      await this.aboutService.saveProfile(this.form);
      this.saveMessage = this.i18n.t('aboutForm.saved');
      setTimeout(() => {
        this.saveMessage = '';
        this.router.navigate(['/admin/dashboard'], { queryParams: { tab: 'about' } });
      }, 1500);
    } catch (e) {
      console.error(e);
      this.saveMessage = this.i18n.t('aboutForm.error');
    } finally {
      this.saving = false;
    }
  }

  async deleteProfile(): Promise<void> {
    if (!this.form.id || !confirm('Видалити цей профіль?')) return;
    this.deleting = true;
    try {
      await this.aboutService.deleteProfile(this.form.id);
      this.router.navigate(['/admin/dashboard'], { queryParams: { tab: 'about' } });
    } catch (e) {
      console.error(e);
    } finally {
      this.deleting = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
