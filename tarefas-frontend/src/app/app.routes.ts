import { Routes } from '@angular/router';
import { TarefasComponent } from './pages/tarefas/tarefas';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tarefas', component: TarefasComponent, canActivate: [authGuard] }
];