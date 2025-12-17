import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type Language = 'en' | 'fr';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  newTask: string;
  totalTasks: string;
  completed: string;
  completionRate: string;
  keepItUp: string;
  categories: string;
  noData: string;
  filters: string;
  searchPlaceholder: string;
  status: string;
  all: string;
  todo: string;
  inProgress: string;
  done: string;
  priority: string;
  allPriorities: string;
  high: string;
  medium: string;
  low: string;
  yourTasks: string;
  editTask: string;
  title: string;
  titleRequired: string;
  description: string;
  category: string;
  cancel: string;
  update: string;
  create: string;
  categoryPersonal: string;
  categoryWork: string;
  categoryShopping: string;
  categoryHealth: string;
  categoryFinance: string;
  start: string;
  pause: string;
  restart: string;
  finish: string;
  [key: string]: string; // Keep index signature for dynamic access if needed (e.g. category + name)
}

// Default fallback in case JSON fails or loads slowly
const DEFAULT_TRANSLATIONS: Translations = {
  appTitle: 'TaskWise',
  appSubtitle: 'Manage your day with elegance.',
  newTask: 'New Task',
  totalTasks: 'Total Tasks',
  completed: 'completed',
  completionRate: 'Completion Rate',
  keepItUp: 'Keep it up!',
  categories: 'Categories',
  noData: 'No data yet',
  filters: 'Filters',
  searchPlaceholder: 'Search tasks...',
  status: 'Status',
  all: 'All',
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
  priority: 'Priority',
  allPriorities: 'All Priorities',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  yourTasks: 'Your Tasks',
  editTask: 'Edit Task',
  title: 'Title',
  titleRequired: 'Title is required.',
  description: 'Description',
  category: 'Category',
  cancel: 'Cancel',
  update: 'Update',
  create: 'Create',
  categoryPersonal: 'Personal',
  categoryWork: 'Work',
  categoryShopping: 'Shopping',
  categoryHealth: 'Health',
  categoryFinance: 'Finance',
  start: 'Start',
  pause: 'Pause',
  restart: 'Restart',
  finish: 'Finish'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private http = inject(HttpClient);

  currentLang = signal<Language>('fr'); // Default to French
  translations = signal<Translations>(DEFAULT_TRANSLATIONS);

  constructor() {
    this.loadTranslations(this.currentLang());
  }

  async toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'fr' : 'en';
    this.currentLang.set(newLang);
    await this.loadTranslations(newLang);
  }

  private async loadTranslations(lang: Language) {
    try {
      const data = await firstValueFrom(this.http.get<Translations>(`assets/i18n/${lang}.json`));
      this.translations.set(data);
    } catch (error) {
      console.error(`Could not load translations for ${lang}`, error);
    }
  }

  get t() {
    return this.translations();
  }
}
