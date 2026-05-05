package com.macro.macro.Controller;
import com.macro.macro.Model.ENUM.EAcao;
import com.macro.macro.Model.Microservico;
import com.macro.macro.Service.MicroservicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public Microservico findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/all/{limit}")
    public List<Microservico> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }


    @PostMapping("/{acao}/{id}")
    public ResponseEntity<?> executar(
            @PathVariable String id,
            @PathVariable String acao
    ) {
        try {
            Microservico ms = service.findById(id);

            if (ms == null) {
                return ResponseEntity.status(404).body("Microserviço não encontrado");
            }

            EAcao acaoEnum = EAcao.valueOf(acao.toUpperCase());

            service.executarAcao(ms, acaoEnum);

            return ResponseEntity.ok("Ação executada: " + acaoEnum);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Ação inválida");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body("Erro ao executar ação");
        }
    }
    
    
    
}
