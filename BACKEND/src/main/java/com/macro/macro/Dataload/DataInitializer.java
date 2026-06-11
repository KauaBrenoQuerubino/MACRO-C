package com.macro.macro.Dataload;

import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UsuarioService usuarioService;

    @Bean
    CommandLineRunner init() {
        return args -> {

            if (usuarioService.findAll(100).size() == 0) {

                UsuarioDTO admin = new UsuarioDTO();
                admin.setNome("Administrador");
                admin.setEmail("kauabrenoyt@gmail.com");
                admin.setSenha("teste123");
                admin.setPerfil("ADMIN");

                usuarioService.save(admin);

                System.out.println("Usuário administrador criado.");
            }
        };
    }
}