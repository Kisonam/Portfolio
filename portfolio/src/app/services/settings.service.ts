import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { SiteSettings, PageVisibility } from '../models/settings.model';
import { db } from './firebase.init';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_DOC_ID = 'site-settings';
  private settingsSubject = new BehaviorSubject<SiteSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  private async loadSettings(): Promise<void> {
    try {
      const settingsRef = doc(db, 'settings', this.SETTINGS_DOC_ID);
      const settingsSnap = await getDoc(settingsRef);

      if (settingsSnap.exists()) {
        const data = settingsSnap.data() as SiteSettings;
        this.settingsSubject.next(data);
      } else {
        // Створюємо дефолтні налаштування якщо їх немає
        const defaultSettings: SiteSettings = {
          pageVisibility: {
            blog: true,
            projects: true,
            about: true,
            games: true
          },
          updatedAt: new Date()
        };
        await this.saveSettings(defaultSettings);
        this.settingsSubject.next(defaultSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // У разі помилки використовуємо дефолтні налаштування
      this.settingsSubject.next({
        pageVisibility: {
          blog: true,
          projects: true,
          about: true,
          games: true
        },
        updatedAt: new Date()
      });
    }
  }

  async saveSettings(settings: SiteSettings): Promise<void> {
    const settingsRef = doc(db, 'settings', this.SETTINGS_DOC_ID);
    const dataToSave = {
      ...settings,
      updatedAt: new Date()
    };
    await setDoc(settingsRef, dataToSave);
    this.settingsSubject.next(dataToSave);
  }

  getSettings(): SiteSettings | null {
    return this.settingsSubject.value;
  }

  isPageVisible(page: keyof PageVisibility): boolean {
    const settings = this.settingsSubject.value;
    return settings?.pageVisibility[page] ?? true;
  }

  async updatePageVisibility(page: keyof PageVisibility, visible: boolean): Promise<void> {
    const currentSettings = this.settingsSubject.value;
    if (currentSettings) {
      const updatedSettings: SiteSettings = {
        ...currentSettings,
        pageVisibility: {
          ...currentSettings.pageVisibility,
          [page]: visible
        }
      };
      await this.saveSettings(updatedSettings);
    }
  }
}
