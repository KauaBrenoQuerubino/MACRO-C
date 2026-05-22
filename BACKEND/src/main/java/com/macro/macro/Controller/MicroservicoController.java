package com.macro.macro.Controller;
import com.macro.macro.Model.DTO.RequisicaoDTO;
import com.macro.macro.Model.ENUM.EAcao;
import com.macro.macro.Model.Microservico;
import com.macro.macro.Service.MicroservicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;
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

    @PutMapping
    public Microservico update(@RequestBody Microservico dto) {
        return service.update(dto);
    }

    @GetMapping("/{id}")
    public Microservico findById(@PathVariable String id) throws ExecutionException, InterruptedException{
        return service.findById(id);
    }

    @GetMapping("/all/{limit}")
    public List<Microservico> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) throws ExecutionException, InterruptedException {
        service.delete(id);
    }

    @PostMapping("/{acao}/{id}")
    public ResponseEntity<?> executar(@PathVariable String id, @PathVariable String acao) {
        try {
            Microservico ms = service.findById(id);

            if (ms == null) {
                return ResponseEntity.status(404).body(Map.of("message","Microserviço não encontrado"));
            }

            EAcao acaoEnum = EAcao.valueOf(acao.toUpperCase());

            service.executarAcao(ms, acaoEnum);

            return ResponseEntity.ok(Map.of("message","Ação executada: " + acaoEnum));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message","Ação inválida"));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(Map.of("message","Erro ao executar ação"));
        }
    }


    @PostMapping("/{id}/saveRequest")
    public void saveRequest(@PathVariable String id, @RequestBody RequisicaoDTO dto)
            throws ExecutionException, InterruptedException {
        service.adicionarRequisicao(id, dto);
    }

    @PostMapping("/{id}/sendRequest")
    public String  sendRequest(@PathVariable String id, @RequestBody RequisicaoDTO dto)
            throws ExecutionException, InterruptedException, IOException {

        Microservico msc = service.findById(id);

        return service.fazerRequisicao(msc.getUrl(), dto);
    }

    @Scheduled(fixedRate = 30000)
    public void monitorar() throws ExecutionException, InterruptedException {

        List<Microservico> lista = service.findAll(100);

        for (Microservico ms : lista) {
            long inicio = System.currentTimeMillis();

            try {
                String url = ms.getUrl() + ms.getHealthEndpoint();

                RestTemplate restTemplate = new RestTemplate();

                ResponseEntity<Map> response =
                        restTemplate.getForEntity(url, Map.class);

                long fim = System.currentTimeMillis();

                if (response.getStatusCode().value() == 200) {

                    ms.setStatus("UP");
                    ms.setResponseTime(fim - inicio);
                } else {
                    ms.setStatus("DOWN");
                    ms.setResponseTime(fim - inicio);
                }

            } catch (Exception e) {
                ms.setStatus("DOWN");
            }

            service.update(ms);
        }
    }

    
    
    
}
