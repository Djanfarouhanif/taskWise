import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

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
