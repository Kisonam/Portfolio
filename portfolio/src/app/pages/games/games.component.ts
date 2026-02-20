import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { I18nService } from '../../services/i18n.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  loading = true;
  selectedGame: Game | null = null;
  activeFilter: 'all' | 'playing' | 'completed' | 'dropped' | 'backlog' = 'all';

  constructor(
    public i18n: I18nService,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService.games$.subscribe(games => {
      this.games = games;
      this.loading = false;
    });
  }

  get filteredGames(): Game[] {
    if (this.activeFilter === 'all') return this.games;
    return this.games.filter(g => g.status === this.activeFilter);
  }

  openGame(game: Game): void {
    this.selectedGame = game;
    document.body.style.overflow = 'hidden';
  }

  closeGame(): void {
    this.selectedGame = null;
    document.body.style.overflow = '';
  }

  formatHours(h: number): string {
    if (h < 1) return `${Math.round(h * 60)} ${this.i18n.t('games.minutes')}`;
    return `${h} ${this.i18n.t('games.hours')}`;
  }

  getStatusLabel(status: string): string {
    return this.i18n.t(`games.status.${status}`);
  }

  getCompletedAchievements(game: Game): number {
    return game.achievements?.filter(a => a.completed).length ?? 0;
  }

  getRatingStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
