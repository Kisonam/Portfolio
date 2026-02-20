import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AboutContent } from '../models/about.model';
import { db } from './firebase.init';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly DOC_ID = 'about-content';
  private aboutSubject = new BehaviorSubject<AboutContent | null>(null);
  public about$ = this.aboutSubject.asObservable();

  constructor() {
    this.loadAbout();
  }

  private async loadAbout(): Promise<void> {
    try {
      const ref = doc(db, 'settings', this.DOC_ID);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        this.aboutSubject.next(snap.data() as AboutContent);
      }
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  }

  async saveAbout(content: AboutContent): Promise<void> {
    const ref = doc(db, 'settings', this.DOC_ID);
    const dataToSave = { ...content, updatedAt: new Date() };
    await setDoc(ref, dataToSave);
    this.aboutSubject.next(dataToSave);
  }

  getAbout(): AboutContent | null {
    return this.aboutSubject.value;
  }
}
