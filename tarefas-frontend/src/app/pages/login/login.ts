import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  usuario: Usuario = { username: '', password: '' };
  erro: string = '';
  modo: 'login' | 'registrar' = 'login';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar() {
    this.authService.login(this.usuario).subscribe({
      next: () => this.router.navigate(['/tarefas']),
      error: () => this.erro = 'Usuário ou senha incorretos'
    });
  }

  registrar() {
    this.authService.registrar(this.usuario).subscribe({
      next: () => this.router.navigate(['/tarefas']),
      error: () => this.erro = 'Erro ao registrar usuário'
    });
  }
}