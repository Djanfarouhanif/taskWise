import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { LanguageService } from '../../services/language.service';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  taskService = inject(TaskService);
  languageService = inject(LanguageService);

  @Output() onEditTask = new EventEmitter<Task>();

  onEdit(task: Task) {
    this.onEditTask.emit(task);
  }
}
