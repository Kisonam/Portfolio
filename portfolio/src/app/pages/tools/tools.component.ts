import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../services/tools.service';
import { I18nService } from '../../services/i18n.service';
import { Tool } from '../../models/tool.model';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent implements OnInit {
  tools: Tool[] = [];
  loading = true;
  selectedTool: Tool | null = null;
  activeCategory: string = 'all';

  constructor(
    public i18n: I18nService,
    private toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    this.toolsService.tools$.subscribe(tools => {
      this.tools = tools;
      this.loading = false;
    });
  }

  get categories(): string[] {
    const cats = new Set(this.tools.map(t => t.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(cats)];
  }

  get filteredTools(): Tool[] {
    if (this.activeCategory === 'all') return this.tools;
    return this.tools.filter(t => t.category === this.activeCategory);
  }

  openTool(tool: Tool): void {
    this.selectedTool = tool;
    document.body.style.overflow = 'hidden';
  }

  closeTool(): void {
    this.selectedTool = null;
    document.body.style.overflow = '';
  }

  formatHours(h: number): string {
    if (h < 1) return `${Math.round(h * 60)} ${this.i18n.t('tools.minutes')}`;
    return `${h} ${this.i18n.t('tools.hours')}`;
  }

  getTotalHours(): number {
    return this.tools.reduce((sum, t) => sum + (t.hoursUsed || 0), 0);
  }
}
