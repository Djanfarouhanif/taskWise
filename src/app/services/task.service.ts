import { computed, effect, Injectable, signal } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Task, TaskFilter, TaskPriority, TaskStatus } from '../models/task.model';

interface TaskDB extends DBSchema {
  tasks: {
    key: number;
    value: Task;
    indexes: { 'by-status': string; 'by-category': string };
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private dbPromise: Promise<IDBPDatabase<TaskDB>>;

  // Signals for state management
  private tasksSignal = signal<Task[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();

  private filterSignal = signal<TaskFilter>({});

  readonly filteredTasks = computed(() => {
    const tasks = this.tasksSignal();
    const filter = this.filterSignal();

    return tasks.filter((task) => {
      const matchQuery = !filter.query || task.title.toLowerCase().includes(filter.query.toLowerCase());
      const matchCategory = !filter.category || task.category === filter.category;
      const matchStatus = !filter.status || task.status === filter.status;
      const matchPriority = !filter.priority || task.priority === filter.priority;

      return matchQuery && matchCategory && matchStatus && matchPriority;
    });
  });

  readonly stats = computed(() => {
    const tasks = this.tasksSignal();
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byCategory: Record<string, number> = {};
    tasks.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });

    return { total, completed, pending, completionRate, byCategory };
  });

  constructor() {
    this.dbPromise = openDB<TaskDB>('task-wise-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('tasks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('by-status', 'status');
        store.createIndex('by-category', 'category');
      },
    });

    this.loadTasks();
  }

  async loadTasks() {
    const db = await this.dbPromise;
    const allTasks = await db.getAll('tasks');
    this.tasksSignal.set(allTasks);
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      createdAt: new Date(),
    };
    const db = await this.dbPromise;
    await db.add('tasks', newTask);
    await this.loadTasks();
  }

  async updateTask(task: Task) {
    const db = await this.dbPromise;
    await db.put('tasks', task);
    await this.loadTasks();
  }

  async deleteTask(id: number) {
    const db = await this.dbPromise;
    await db.delete('tasks', id);
    await this.loadTasks();
  }

  updateFilter(filter: TaskFilter) {
    this.filterSignal.update((current) => ({ ...current, ...filter }));
  }
}
