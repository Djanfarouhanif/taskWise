import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskPriority } from '../../models/task.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() onSave = new EventEmitter<Omit<Task, 'id' | 'createdAt'>>();
  @Output() onUpdate = new EventEmitter<Task>();
  @Output() onCancel = new EventEmitter<void>();

  languageService = inject(LanguageService);

  taskForm!: FormGroup;
  priorities: TaskPriority[] = ['low', 'medium', 'high'];
  categories: string[] = ['Personal', 'Work', 'Shopping', 'Health', 'Finance'];

  get isEditMode(): boolean {
    return !!this.task;
  }

  constructor(private fb: FormBuilder) {}

  getPriorityTranslation(p: string): string {
    return (this.languageService.t as any)[p] || p;
  }

  getCategoryTranslation(c: string): string {
    return (this.languageService.t as any)[`category${c}`] || c;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', [Validators.required]],
      description: [this.task?.description || ''],
      category: [this.task?.category || 'Personal'],
      priority: [this.task?.priority || 'medium'],
      status: [this.task?.status || 'todo']
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.task) {
        this.onUpdate.emit({ ...this.task, ...this.taskForm.value });
      } else {
        this.onSave.emit(this.taskForm.value);
      }
      this.taskForm.reset();
    }
  }
}
