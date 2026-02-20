import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { ActivityDay } from '../../models/activity.model';
import { I18nService } from '../../services/i18n.service';
import { Subscription } from 'rxjs';

/**
 * Компонент календаря активності (Activity Heatmap).
 * Відображає SVG-сітку за обраний рік, де кожен квадрат — один день.
 * Інтенсивність кольору залежить від кількості подій (створення/редагування контенту).
 * Підтримує вибір року та показ деталей активності при кліку на день.
 */

@Component({
  selector: 'app-activity-heatmap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-heatmap.component.html',
  styleUrl: './activity-heatmap.component.scss'
})
export class ActivityHeatmapComponent implements OnInit {
  private activityService = inject(ActivityService);
  i18n = inject(I18nService);

  /** Масив днів активності за рік */
  days: ActivityDay[] = [];

  /** Масив тижнів (кожен тижень — масив з 7 днів) для побудови SVG-сітки */
  weeks: ActivityDay[][] = [];

  /** Назви місяців для підписів (оновлюються при зміні мови) */
  get months(): string[] {
    return this.i18n.t('heatmap.months').split(',');
  }

  /** Позиції підписів місяців (індекс місяця + номер тижня) */
  monthLabels: { monthIndex: number; col: number }[] = [];

  /** Розмір одного квадрата в пікселях */
  cellSize = 13;

  /** Відступ між квадратами */
  cellGap = 3;

  /** Тултіп для наведення на квадрат */
  tooltip = { show: false, text: '', x: 0, y: 0 };

  /** Обраний рік */
  selectedYear = new Date().getFullYear();

  /** Доступні роки (від 2026 до поточного) */
  availableYears: number[] = [];

  /** Обраний день (при кліку) */
  selectedDay: ActivityDay | null = null;

  /** Підписка на дані активності */
  private dataSub?: Subscription;

  ngOnInit() {
    /** Генеруємо список доступних років */
    const currentYear = new Date().getFullYear();
    for (let y = 2026; y <= currentYear; y++) {
      this.availableYears.push(y);
    }
    this.loadYear(this.selectedYear);
  }

  /** Завантажити дані за обраний рік */
  loadYear(year: number) {
    this.selectedYear = year;
    this.selectedDay = null;
    this.dataSub?.unsubscribe();
    this.dataSub = this.activityService.getActivityData(year).subscribe(days => {
      this.days = days;
      this.buildWeeks();
      this.buildMonthLabels();
    });
  }

  /**
   * Групує дні у тижні (колонки) для SVG-сітки.
   * Перший тиждень може бути неповним (починається не з понеділка).
   */
  private buildWeeks() {
    this.weeks = [];
    let currentWeek: ActivityDay[] = [];

    /** Визначаємо день тижня першого дня (0=Нд, 1=Пн, ..., 6=Сб) */
    if (this.days.length > 0) {
      const firstDay = new Date(this.days[0].date).getDay();
      /** Заповнюємо порожні дні на початку (якщо рік не починається з неділі) */
      for (let i = 0; i < firstDay; i++) {
        currentWeek.push({ date: '', level: -1, count: 0 });
      }
    }

    for (const day of this.days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    /** Додаємо останній неповний тиждень */
    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }
  }

  /**
   * Визначає позиції підписів місяців під сіткою.
   * Зберігає індекс місяця замість назви, щоб переклади оновлювались при зміні мови.
   * Пропускає грудень на початку року (padding-дні).
   */
  private buildMonthLabels() {
    this.monthLabels = [];
    let lastMonth = -1;

    this.weeks.forEach((week, colIndex) => {
      for (const day of week) {
        if (day.date) {
          const month = new Date(day.date).getMonth();
          if (month !== lastMonth) {
            /** Пропускаємо грудень (11) якщо він з'являється на початку (padding-дні минулого року) */
            if (!(colIndex === 0 && month === 11)) {
              this.monthLabels.push({ monthIndex: month, col: colIndex });
            }
            lastMonth = month;
          }
          break;
        }
      }
    });
  }

  /**
   * Повертає колір квадрата залежно від рівня активності.
   * @param level — рівень від 0 до 4
   */
  getCellColor(level: number): string {
    const colors: Record<number, string> = {
      [-1]: 'transparent',  // Порожня клітинка (до початку року)
      0: '#161b22',         // Немає активності
      1: '#0e4429',         // Мало активності
      2: '#006d32',         // Середня активність
      3: '#26a641',         // Висока активність
      4: '#39d353'          // Дуже висока активність
    };
    return colors[level] ?? '#161b22';
  }

  /** Показати тултіп при наведенні на квадрат */
  showTooltip(event: MouseEvent, day: ActivityDay) {
    if (day.level === -1) return;
    this.tooltip = {
      show: true,
      text: day.count > 0
        ? `${day.count} ${this.i18n.t('heatmap.events')} — ${day.date}`
        : `${this.i18n.t('heatmap.noActivity')} — ${day.date}`,
      x: (event.target as SVGElement).getBoundingClientRect().left,
      y: (event.target as SVGElement).getBoundingClientRect().top - 30
    };
  }
  /** Сховати тултіп */
  hideTooltip() {
    this.tooltip.show = false;
  }

  /** Обробник кліку на день — показує деталі активності */
  selectDay(day: ActivityDay) {
    if (day.level === -1) return;
    this.selectedDay = this.selectedDay?.date === day.date ? null : day;
  }

  /** Отримати посилання на контент за типом */
  getContentLink(contentType: string, id: string): string {
    return contentType === 'post' ? `/blog/${id}` : `/projects/${id}`;
  }
}
