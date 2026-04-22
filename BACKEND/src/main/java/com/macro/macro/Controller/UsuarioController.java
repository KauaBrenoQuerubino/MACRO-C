package com.macro.macro.Controller;


import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService service;

    @PostMapping
    public void save(@RequestBody UsuarioDTO dto) {
        service.save(dto);
    }




}
