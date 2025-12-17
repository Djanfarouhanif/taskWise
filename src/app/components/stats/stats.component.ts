import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  private taskService = inject(TaskService);
  languageService = inject(LanguageService);
  stats = this.taskService.stats;

  objectKeys = Object.keys;

  getCategoryTranslation(cat: string): string {
    const key = `category${cat}` as keyof typeof this.languageService.t;
    return this.languageService.t[key] || cat;
  }
}
