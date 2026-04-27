package com.macro.macro.Controller;


import com.macro.macro.Model.Mensagem;
import com.macro.macro.Service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;


@CrossOrigin("*")
@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    @Autowired
    MensagemService service;

    @PostMapping
    public Mensagem save(@RequestBody Mensagem dto) {
        return service.save(dto);
    }

    @GetMapping
    public Mensagem findByEmail(@RequestBody String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/{limit}")
    public List<Mensagem> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }
}
