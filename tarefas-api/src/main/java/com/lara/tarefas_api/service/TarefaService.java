package com.lara.tarefas_api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lara.tarefas_api.model.Tarefa;
import com.lara.tarefas_api.repository.TarefaRepository;

@Service
public class TarefaService {

     @Autowired
    private TarefaRepository repository;

    public List<Tarefa> listarTarefas() {
        return repository.findAll();
    }

    public Tarefa criarTarefa(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    public Tarefa buscarPorId(Long id) {

        Optional<Tarefa> tarefa = repository.findById(id);
        return tarefa.orElse(null);
    }

    public boolean removerTarefa(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public Tarefa atualizarTarefa(Long id, Tarefa novaTarefa) {

    Optional<Tarefa> tarefaExistente = repository.findById(id);

        if (tarefaExistente.isPresent()) {
            Tarefa tarefa = tarefaExistente.get();

            tarefa.setTitulo(novaTarefa.getTitulo());
            tarefa.setConcluida(novaTarefa.isConcluida());

            return repository.save(tarefa);
        }

        return null;
}
}