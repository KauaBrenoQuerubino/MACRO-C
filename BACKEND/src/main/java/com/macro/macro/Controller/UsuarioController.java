package com.macro.macro.Controller;


import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Usuario save(@RequestBody UsuarioDTO dto) {
        return service.save(dto);
    }

    @GetMapping
    public Usuario findByEmail(@RequestBody String email) throws ExecutionException, InterruptedException{
        return service.findByEmail(email);
    }

    @GetMapping("/all/{limit}")
    public List<Usuario> findAll(@PathVariable int limit) throws ExecutionException, InterruptedException{
        return service.findAll(limit);
    }

}
