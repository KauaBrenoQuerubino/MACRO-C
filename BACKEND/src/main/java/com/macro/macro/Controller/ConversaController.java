package com.macro.macro.Controller;


import com.macro.macro.Model.Conversa;
import com.macro.macro.Model.DTO.ConversaDTO;
import com.macro.macro.Model.Mensagem;
import com.macro.macro.Service.ConversaService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Conversa save(@RequestBody ConversaDTO dto) {
        return service.save(dto);
    }

    @GetMapping("/{id}")
    public Conversa findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/all/{limit}")
    public List<Conversa> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }


    @GetMapping("/user/{id}")
    public List<Conversa> findByUserId(@PathVariable String id) throws Exception {
        return service.findByUserID(id);
    }

    @PostMapping("/{idConversa}/sendMensagem")
    public Mensagem sendMensage(@PathVariable String idConversa, @RequestBody Mensagem mensagem) throws Exception {
        Mensagem msg = service.addMensagem(idConversa, mensagem);
        return msg;
    }

    @GetMapping("/{idConversa}/readMensagem")
    public List<Mensagem> mensagemList(@PathVariable String idConversa) throws Exception {
        return service.getMensagens(idConversa);
    }

    @GetMapping("/{idDestinatario}/notReadMensagens")
    public List<Mensagem> findNotRead(@PathVariable String idDestinatario) throws ExecutionException, InterruptedException {
        return service.findNotRead(idDestinatario);
    }

    @PostMapping("{idConversa}/markAsRead/{idMensagem}")
    public void markAsRead(@PathVariable String idConversa,@PathVariable String idMensagem) throws ExecutionException, InterruptedException {
        System.out.println("read");
        service.markAsRead(idConversa, idMensagem);
    }



}
