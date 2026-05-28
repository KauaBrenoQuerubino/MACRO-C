package com.macro.macro.Controller;


import com.macro.macro.Model.Chamado;
import com.macro.macro.Model.Conversa;
import com.macro.macro.Model.DTO.ComentarioDTO;
import com.macro.macro.Service.ChamadosService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequestMapping("/chamados")
public class ChamadosController {

    @Autowired
    ChamadosService service;

    @PostMapping
    public Chamado save(@RequestBody Chamado dto) {
        return service.save(dto);
    }

    @PutMapping
    public Chamado update(@RequestBody Chamado dto) {
        return service.update(dto);
    }

    @GetMapping("/{id}")
    public Chamado findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @PostMapping("/{id}/comentario")
    public Chamado adicionarChamado(@PathVariable String id, @RequestBody ComentarioDTO comentarioDTO) throws ExecutionException, InterruptedException {
        Chamado data = service.findById(id);
        if (data.getComentarios() == null) {
            data.setComentarios(new ArrayList<>());
        }
        data.getComentarios().add(comentarioDTO);

        return service.update(data);
    }

    @GetMapping("/status/{status}")
    public List<Chamado> findByStatus(@PathVariable String status) throws ExecutionException, InterruptedException {
        return service.findByStatus(status);
    }

    @GetMapping("/all/{limit}")
    public List<Chamado> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException {
        return service.findAll(limit);
    }


}
