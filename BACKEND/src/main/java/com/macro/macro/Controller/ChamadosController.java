package com.macro.macro.Controller;


import com.macro.macro.Model.Chamado;
import com.macro.macro.Model.Conversa;
import com.macro.macro.Model.DTO.ComentarioDTO;
import com.macro.macro.Service.ChamadosService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> save(@RequestBody Chamado dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Chamado dto) {

        return ResponseEntity.status(HttpStatus.OK).body(service.update(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));
    }

    @PostMapping("/{id}/comentario")
    public ResponseEntity<?> adicionarChamado(@PathVariable String id, @RequestBody ComentarioDTO comentarioDTO) throws ExecutionException, InterruptedException {
        Chamado data = service.findById(id);
        if (data.getComentarios() == null) {
            data.setComentarios(new ArrayList<>());
        }
        data.getComentarios().add(comentarioDTO);

        return ResponseEntity.status(HttpStatus.OK).body(service.update(data));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> findByStatus(@PathVariable String status) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.findByStatus(status));
    }

    @GetMapping("/all/{limit}")
    public ResponseEntity<?> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll(limit));
    }


}
