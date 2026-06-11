import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css'
})
export class TarefasComponent implements OnInit {

  tarefas: any[] = [];
  novaTarefa = { titulo: '', concluida: false };
  editando: any = null;

  constructor(
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefaService.listar().subscribe(data => {
      this.tarefas = data;
      this.cdr.detectChanges();
    });
  }

  adicionarTarefa() {
    if (!this.novaTarefa.titulo.trim()) return;
    this.tarefaService.criar(this.novaTarefa).subscribe(tarefaCriada => {
      this.tarefas = [tarefaCriada, ...this.tarefas];
      this.novaTarefa = { titulo: '', concluida: false };
      this.cdr.detectChanges();
    });
  }

  deletarTarefa(id: number) {
    this.tarefaService.deletar(id).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
      this.cdr.detectChanges();
    });
  }

  concluirTarefa(tarefa: any) {
    const tarefaAtualizada = { ...tarefa, concluida: true };
    this.tarefaService.atualizar(tarefa.id, tarefaAtualizada).subscribe(() => {
      this.tarefas = this.tarefas.map(t => t.id === tarefa.id ? tarefaAtualizada : t);
      this.cdr.detectChanges();
    });
  }

  salvarEdicao() {
    if (!this.editando.titulo.trim()) return;
    const editando = { ...this.editando };
    this.tarefaService.atualizar(editando.id, editando).subscribe(() => {
      this.tarefas = this.tarefas.map(t => t.id === editando.id ? editando : t);
      this.editando = null;
      this.cdr.detectChanges();
    });
  }

  editar(tarefa: any) {
    this.editando = { ...tarefa };
  }

  cancelarEdicao() {
    this.editando = null;
  }

  sair() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}