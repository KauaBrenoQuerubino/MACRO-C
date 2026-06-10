package com.macro.macro.Controller;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Model.DTO.RequisicaoDTO;
import com.macro.macro.Model.ENUM.EAcao;
import com.macro.macro.Model.Microservico;
import com.macro.macro.Service.MicroservicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    public ResponseEntity<?> save(@RequestBody Microservico dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
        }catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?>  update(@RequestBody Microservico dto) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.update(dto));

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) throws ExecutionException, InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));
    }

    @GetMapping("/all/{limit}")
    public ResponseEntity<?> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll(limit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) throws ExecutionException, InterruptedException {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Servico deletado");
    }

    @PostMapping("/{acao}/{id}")
    public ResponseEntity<?> executar(@PathVariable String id, @PathVariable String acao) throws ExecutionException, InterruptedException {
        Microservico ms = service.findById(id);

        if (ms == null) {
            return ResponseEntity.status(404).body(Map.of("message","Microserviço não encontrado"));
        }

        EAcao acaoEnum = EAcao.valueOf(acao.toUpperCase());

        service.executarAcao(ms, acaoEnum);

        return ResponseEntity.ok(Map.of("message","Ação executada: " + acaoEnum));
    }

    @PostMapping("/{id}/sendRequest")
    public ResponseEntity<?>  sendRequest(@PathVariable String id, @RequestBody RequisicaoDTO dto) throws ExecutionException, InterruptedException, IOException {

        Microservico msc = service.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(service.fazerRequisicao(msc.getUrl(), dto));
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


    //    @PostMapping("/{id}/saveRequest")
//    public void saveRequest(@PathVariable String id, @RequestBody RequisicaoDTO dto)
//            throws ExecutionException, InterruptedException {
//        service.adicionarRequisicao(id, dto);
//    }
    
    
}
