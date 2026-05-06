package com.macro.macro.Controller;


import com.macro.macro.Model.Chamado;
import com.macro.macro.Model.Conversa;
import com.macro.macro.Service.ChamadosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public Chamado findById(@RequestBody String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    public List<Chamado> findByStatus(@PathVariable String status) throws ExecutionException, InterruptedException {
        return service.findByStatus(status);
    }

    @GetMapping("/{limit}")
    public List<Chamado> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException {
        return service.findAll(limit);
    }


}
