package com.macro.macro.Controller;


import com.macro.macro.Model.Conversa;
import com.macro.macro.Service.ConversaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequestMapping("/conversa")
public class ConversaController {

    @Autowired
    ConversaService service;

    @PostMapping
    public Conversa save(@RequestBody Conversa dto) {
        return service.save(dto);
    }

    @GetMapping
    public Conversa findById(@RequestBody String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/{limit}")
    public List<Conversa> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }


}
