import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/seo-analyzer/seo-analyzer.component').then(m => m.SeoAnalyzerComponent)
  }
];
