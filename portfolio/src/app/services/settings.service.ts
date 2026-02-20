import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { SiteSettings, PageVisibility } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_DOC_ID = 'site-settings';
  private settingsSubject = new BehaviorSubject<SiteSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadSettings();
  }

  private async loadSettings(): Promise<void> {
    const settingsRef = doc(this.firestore, 'settings', this.SETTINGS_DOC_ID);
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
          about: true
        },
        updatedAt: new Date()
      };
      await this.saveSettings(defaultSettings);
      this.settingsSubject.next(defaultSettings);
    }
  }

  async saveSettings(settings: SiteSettings): Promise<void> {
    const settingsRef = doc(this.firestore, 'settings', this.SETTINGS_DOC_ID);
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
