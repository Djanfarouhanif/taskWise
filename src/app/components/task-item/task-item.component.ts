import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onStatusChange = new EventEmitter<Task>();

  languageService = inject(LanguageService);

  setStatus(status: 'todo' | 'in-progress' | 'done') {
    const updatedTask = { ...this.task, status };
    this.onStatusChange.emit(updatedTask);
  }

  getPriorityTranslation(p: string): string {
    return (this.languageService.t as any)[p] || p;
  }

  getCategoryTranslation(c: string): string {
    return (this.languageService.t as any)[`category${c}`] || c;
  }

  toggleStatus() {
    const nextStatus = {
      'todo': 'in-progress',
      'in-progress': 'done',
      'done': 'todo'
    } as const;

    const updatedTask = { ...this.task, status: nextStatus[this.task.status] };
    this.onStatusChange.emit(updatedTask);
  }
}
