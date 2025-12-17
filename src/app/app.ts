import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './components/stats/stats.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task, TaskFilter, TaskPriority, TaskStatus } from './models/task.model';
import { LanguageService } from './services/language.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent, TaskFormComponent, StatsComponent],
  templateUrl: './app.html'
})
export class App {
  taskService = inject(TaskService);
  languageService = inject(LanguageService);

  showForm = false;
  selectedTask: Task | null = null;
  filters: TaskFilter = {
    status: undefined,
    priority: undefined,
    query: ''
  };

  updateFilter() {
    // Convert 'undefined' string to real undefined if coming from select
    if (this.filters.priority as any === 'undefined') this.filters.priority = undefined;
    if (this.filters.status as any === 'undefined') this.filters.status = undefined;

    this.taskService.updateFilter(this.filters);
  }

  showCreateForm() {
    this.selectedTask = null;
    this.showForm = true;
  }

  openEditForm(task: Task) {
    this.selectedTask = task;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedTask = null;
  }

  handleSave(taskData: any) {
    this.taskService.addTask(taskData);
    this.closeForm();
  }

  handleUpdate(task: Task) {
    this.taskService.updateTask(task);
    this.closeForm();
  }
}
