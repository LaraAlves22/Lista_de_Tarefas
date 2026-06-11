package com.lara.tarefas_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lara.tarefas_api.model.Tarefa;
import com.lara.tarefas_api.service.TarefaService;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:4200", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.OPTIONS
})
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @GetMapping
public List<Tarefa> listarTarefas(Authentication authentication) {

    return tarefaService
            .listarTarefas(authentication.getName());
}

@PostMapping
public Tarefa criarTarefa(
        @RequestBody Tarefa tarefa,
        Authentication authentication) {

    System.out.println("Usuário autenticado: " + authentication.getName());

    return tarefaService
            .criarTarefa(tarefa, authentication.getName());
}

    @GetMapping("/{id}")
    public Tarefa buscarPorId(@PathVariable Long id) {
        return tarefaService.buscarPorId(id);
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerTarefa(@PathVariable Long id) {
    boolean removida = tarefaService.removerTarefa(id);

    if (removida) {
        return ResponseEntity.noContent().build(); // 204
    } else {
        return ResponseEntity.notFound().build(); // 404
    }
}

    @PutMapping("/{id}")
    public Tarefa atualizarTarefa(@PathVariable Long id,
                                  @RequestBody Tarefa tarefa) {
        return tarefaService.atualizarTarefa(id, tarefa);
    }
}