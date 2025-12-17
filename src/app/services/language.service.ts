import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'fr';

export const TRANSLATIONS = {
  en: {
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
  },
  fr: {
    appTitle: 'TaskWise',
    appSubtitle: 'Gérez votre journée avec élégance.',
    newTask: 'Nouvelle Tâche',
    totalTasks: 'Tâches Totales',
    completed: 'terminées',
    completionRate: 'Taux de Complétion',
    keepItUp: 'Continuez comme ça !',
    categories: 'Catégories',
    noData: 'Pas de données',
    filters: 'Filtres',
    searchPlaceholder: 'Rechercher des tâches...',
    status: 'Statut',
    all: 'Tout',
    todo: 'À faire',
    inProgress: 'En cours',
    done: 'Terminé',
    priority: 'Priorité',
    allPriorities: 'Toutes Priorités',
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
    yourTasks: 'Vos Tâches',
    editTask: 'Modifier Tâche',
    title: 'Titre',
    titleRequired: 'Le titre est requis.',
    description: 'Description',
    category: 'Catégorie',
    cancel: 'Annuler',
    update: 'Mettre à jour',
    create: 'Créer',
    categoryPersonal: 'Personnel',
    categoryWork: 'Travail',
    categoryShopping: 'Achats',
    categoryHealth: 'Santé',
    categoryFinance: 'Finances',
    start: 'Commencer',
    pause: 'Pause',
    restart: 'Recommencer',
    finish: 'Terminer'
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<Language>('fr'); // Default to French as per recent request context

  toggleLanguage() {
    this.currentLang.update(lang => lang === 'en' ? 'fr' : 'en');
  }

  get t() {
    return TRANSLATIONS[this.currentLang()];
  }
}
