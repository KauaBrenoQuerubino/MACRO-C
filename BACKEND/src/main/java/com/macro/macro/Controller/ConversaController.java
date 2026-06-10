package com.macro.macro.Controller;


import com.macro.macro.Model.Conversa;
import com.macro.macro.Model.DTO.ConversaDTO;
import com.macro.macro.Model.Mensagem;
import com.macro.macro.Service.ConversaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/conversa")
public class ConversaController {

    @Autowired
    ConversaService service;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ConversaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        Conversa conversa = service.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(conversa);

    }

    @GetMapping("/all/{limit}")
    public ResponseEntity<?> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll(limit));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable String id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(service.findByUserID(id));
    }

    @PostMapping("/{idConversa}/sendMensagem")
    public ResponseEntity<?> sendMensage(@PathVariable String idConversa, @RequestBody Mensagem mensagem) throws Exception {
        Mensagem msg = service.addMensagem(idConversa, mensagem);
        return ResponseEntity.status(HttpStatus.OK).body(msg);
    }

    @GetMapping("/{idConversa}/readMensagem")
    public ResponseEntity<?> mensagemList(@PathVariable String idConversa) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(service.getMensagens(idConversa));
    }

    @GetMapping("/{idDestinatario}/notReadMensagens")
    public ResponseEntity<?> findNotRead(@PathVariable String idDestinatario) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.findNotRead(idDestinatario));
    }

    @PostMapping("{idConversa}/markAsRead/{idMensagem}")
    public void markAsRead(@PathVariable String idConversa,@PathVariable String idMensagem) throws ExecutionException, InterruptedException {
        service.markAsRead(idConversa, idMensagem);
    }



}
