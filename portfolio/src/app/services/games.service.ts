import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';
import { db } from './firebase.init';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly COLLECTION = 'games';
  private gamesSubject = new BehaviorSubject<Game[]>([]);
  public games$ = this.gamesSubject.asObservable();

  constructor() {
    this.loadGames();
  }

  private async loadGames(): Promise<void> {
    try {
      const q = query(collection(db, this.COLLECTION), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const games = snap.docs.map(d => ({ id: d.id, ...d.data() } as Game));
      this.gamesSubject.next(games);
    } catch (error) {
      console.error('Error loading games:', error);
      this.gamesSubject.next([]);
    }
  }

  async getGame(id: string): Promise<Game | null> {
    try {
      const snap = await getDoc(doc(db, this.COLLECTION, id));
      return snap.exists() ? { id: snap.id, ...snap.data() } as Game : null;
    } catch {
      return null;
    }
  }

  async saveGame(game: Game): Promise<string> {
    const id = game.id || doc(collection(db, this.COLLECTION)).id;
    const data = { ...game, id, updatedAt: new Date(), createdAt: game.createdAt ?? new Date() };
    await setDoc(doc(db, this.COLLECTION, id), data);
    await this.loadGames();
    return id;
  }

  async deleteGame(id: string): Promise<void> {
    await deleteDoc(doc(db, this.COLLECTION, id));
    await this.loadGames();
  }
}
