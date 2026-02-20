import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Tool } from '../models/tool.model';
import { db } from './firebase.init';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private readonly COLLECTION = 'timetracker';
  private toolsSubject = new BehaviorSubject<Tool[]>([]);
  public tools$ = this.toolsSubject.asObservable();

  constructor() {
    this.loadTools();
  }

  private async loadTools(): Promise<void> {
    try {
      const q = query(collection(db, this.COLLECTION), orderBy('hoursUsed', 'desc'));
      const snap = await getDocs(q);
      const tools = snap.docs.map(d => ({ id: d.id, ...d.data() } as Tool));
      this.toolsSubject.next(tools);
    } catch (error) {
      console.error('Error loading tools:', error);
      this.toolsSubject.next([]);
    }
  }

  async getTool(id: string): Promise<Tool | null> {
    try {
      const snap = await getDoc(doc(db, this.COLLECTION, id));
      return snap.exists() ? { id: snap.id, ...snap.data() } as Tool : null;
    } catch {
      return null;
    }
  }

  async saveTool(tool: Tool): Promise<string> {
    const id = tool.id || doc(collection(db, this.COLLECTION)).id;
    const data = { ...tool, id, updatedAt: new Date(), createdAt: tool.createdAt ?? new Date() };
    await setDoc(doc(db, this.COLLECTION, id), data);
    await this.loadTools();
    return id;
  }

  async deleteTool(id: string): Promise<void> {
    await deleteDoc(doc(db, this.COLLECTION, id));
    await this.loadTools();
  }
}
