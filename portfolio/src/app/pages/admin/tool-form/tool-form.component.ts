import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolsService } from '../../../services/tools.service';
import { I18nService } from '../../../services/i18n.service';
import { Tool, ToolNote } from '../../../models/tool.model';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.scss'
})
export class ToolFormComponent implements OnInit {
  saving = false;
  deleting = false;
  saveMessage = '';
  isEdit = false;

  form: Tool = {
    name: '',
    icon: '',
    category: '',
    hoursUsed: 0,
    purpose: '',
    notes: [],
    websiteUrl: '',
    pinned: false
  };

  constructor(
    public i18n: I18nService,
    private toolsService: ToolsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.toolsService.getTool(id).then(tool => {
        if (tool) this.form = { ...tool };
      });
    }
  }

  addNote(): void {
    this.form.notes.push({ title: '', description: '' });
  }

  removeNote(i: number): void {
    this.form.notes.splice(i, 1);
  }

  async save(): Promise<void> {
    this.saving = true;
    this.saveMessage = '';
    try {
      await this.toolsService.saveTool(this.form);
      this.saveMessage = this.i18n.t('toolForm.saved');
      setTimeout(() => {
        this.saveMessage = '';
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    } catch (e) {
      console.error(e);
      this.saveMessage = this.i18n.t('toolForm.error');
    } finally {
      this.saving = false;
    }
  }

  async deleteTool(): Promise<void> {
    if (!this.form.id || !confirm(this.i18n.t('toolForm.confirmDelete'))) return;
    this.deleting = true;
    try {
      await this.toolsService.deleteTool(this.form.id);
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
