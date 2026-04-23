package com.macro.macro.Controller;
import com.macro.macro.Model.Microservico;
import com.macro.macro.Service.MicroservicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequestMapping("/micros")
public class MicroservicoController {


    @Autowired
    MicroservicoService service;

    @PostMapping
    public Microservico save(@RequestBody Microservico dto) {
        return service.save(dto);
    }

    @GetMapping
    public Microservico findByEmail(@RequestBody String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/{limit}")
    public List<Microservico> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }
    
    
    
}
