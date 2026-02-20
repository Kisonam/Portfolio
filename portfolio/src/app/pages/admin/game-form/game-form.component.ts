import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GamesService } from '../../../services/games.service';
import { I18nService } from '../../../services/i18n.service';
import { Game, GameAchievement } from '../../../models/game.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss'
})
export class GameFormComponent implements OnInit {
  saving = false;
  deleting = false;
  saveMessage = '';
  isEdit = false;
  genresStr = '';

  form: Game = {
    title: '',
    coverImage: '',
    backgroundImage: '',
    developer: '',
    genre: [],
    hoursPlayed: 0,
    status: 'backlog',
    rating: undefined,
    review: '',
    achievements: [],
    steamUrl: '',
    pinned: false
  };

  statuses: Game['status'][] = ['playing', 'completed', 'dropped', 'backlog'];

  constructor(
    public i18n: I18nService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.gamesService.getGame(id).then(game => {
        if (game) {
          this.form = { ...game };
          this.genresStr = (game.genre ?? []).join(', ');
        }
      });
    }
  }

  addAchievement(): void {
    this.form.achievements.push({ title: '', description: '', completed: false });
  }

  removeAchievement(i: number): void {
    this.form.achievements.splice(i, 1);
  }

  async save(): Promise<void> {
    this.saving = true;
    this.saveMessage = '';
    try {
      this.form.genre = this.genresStr.split(',').map(s => s.trim()).filter(Boolean);
      await this.gamesService.saveGame(this.form);
      this.saveMessage = this.i18n.t('gameForm.saved');
      setTimeout(() => {
        this.saveMessage = '';
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    } catch (e) {
      console.error(e);
      this.saveMessage = this.i18n.t('gameForm.error');
    } finally {
      this.saving = false;
    }
  }

  async deleteGame(): Promise<void> {
    if (!this.form.id || !confirm(this.i18n.t('gameForm.confirmDelete'))) return;
    this.deleting = true;
    try {
      await this.gamesService.deleteGame(this.form.id);
      this.router.navigate(['/admin/dashboard']);
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
