import { Routes } from '@angular/router';
import { TarefasComponent } from './pages/tarefas/tarefas';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefasComponent }
];