package com.lara.tarefas_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lara.tarefas_api.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}