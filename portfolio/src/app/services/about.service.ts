import { Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AboutContent } from '../models/about.model';
import { db } from './firebase.init';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly LEGACY_DOC_ID = 'about-content';
  private readonly COLLECTION = 'about-profiles';

  private aboutSubject = new BehaviorSubject<AboutContent | null>(null);
  public about$ = this.aboutSubject.asObservable();

  private profilesSubject = new BehaviorSubject<AboutContent[]>([]);
  public profiles$ = this.profilesSubject.asObservable();

  constructor() {
    this.loadActiveAbout();
    this.loadProfiles();
  }

  async loadActiveAbout(): Promise<void> {
    try {
      const profiles = await this.fetchProfiles();
      const active = profiles.find(p => p.active) ?? profiles[0] ?? null;
      this.aboutSubject.next(active);
    } catch (error) {
      console.error('Error loading active about:', error);
    }
  }

  async loadProfiles(): Promise<void> {
    try {
      const profiles = await this.fetchProfiles();
      this.profilesSubject.next(profiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  private async fetchProfiles(): Promise<AboutContent[]> {
    const snap = await getDocs(collection(db, this.COLLECTION));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as AboutContent));
  }

  async saveProfile(content: AboutContent): Promise<string> {
    const id = content.id || doc(collection(db, this.COLLECTION)).id;
    const dataToSave = { ...content, id, updatedAt: new Date() };
    await setDoc(doc(db, this.COLLECTION, id), dataToSave);
    await this.loadProfiles();
    await this.loadActiveAbout();
    return id;
  }

  async deleteProfile(id: string): Promise<void> {
    await deleteDoc(doc(db, this.COLLECTION, id));
    await this.loadProfiles();
    await this.loadActiveAbout();
  }

  async setActiveProfile(id: string): Promise<void> {
    const profiles = this.profilesSubject.value;
    const updates = profiles.map(p =>
      setDoc(doc(db, this.COLLECTION, p.id!), { ...p, active: p.id === id }, { merge: true })
    );
    await Promise.all(updates);
    await this.loadProfiles();
    await this.loadActiveAbout();
  }

  async saveAbout(content: AboutContent): Promise<void> {
    await this.saveProfile(content);
  }

  getAbout(): AboutContent | null {
    return this.aboutSubject.value;
  }
}
