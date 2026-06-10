package com.macro.macro.Controller;


import com.macro.macro.Exception.ConflictException;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Model.DTO.UpdateSenhaDTO;
import com.macro.macro.Model.DTO.UpdateUsuarioDTO;
import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService service;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody UsuarioDTO dto) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody UpdateUsuarioDTO usuarioDTO) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.update(id, usuarioDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) throws ExecutionException, InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) throws ExecutionException, InterruptedException{
        return ResponseEntity.status(HttpStatus.OK).body(service.findByEmail(email));
    }

    @GetMapping("/all/{limit}")
    public ResponseEntity<?> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException {
        List<Usuario> usuarios = service.findAll(limit);
        return ResponseEntity.status(HttpStatus.OK).body(usuarios);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) throws ExecutionException, InterruptedException {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuario Deletado");
    }

}
