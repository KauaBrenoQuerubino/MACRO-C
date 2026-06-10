package com.macro.macro.Controller.Auth;


import com.google.firebase.auth.FirebaseAuthException;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Exception.UnauthorizedException;
import com.macro.macro.Model.DTO.LoginDTO;
import com.macro.macro.Model.DTO.TokenRequestDTO;
import com.macro.macro.Model.DTO.UpdateSenhaDTO;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Service.Auth.TokenJWT;
import com.macro.macro.Service.UsuarioService;
import com.macro.macro.Until.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.firebase.auth.FirebaseAuth;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UsuarioService service;

    @Autowired
    TokenJWT jwt;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws ExecutionException, InterruptedException, FirebaseAuthException {

        System.out.println("To aqui");

        Usuario usuario = service.findByEmail(loginDTO.getEmail());

        Map<String, Object> resposta = new HashMap<>();

        if (usuario == null) {
         throw new NotFoundException("Email nao cadastrado");
        }

        if(!usuario.getStatus().equals("ATIVO")) {
            throw new UnauthorizedException("Houve um erro ao efetuar o login, entre em contato com suporte");
        }

        else if (PasswordUtil.matches(loginDTO.getSenha(), usuario.getSenhaHash()) ) {
            String token = jwt.gerarToken(usuario);
            resposta.put("mensagem", "Login efetuado com sucesso");
            resposta.put("id", usuario.getId());
            resposta.put("token", token);

            return ResponseEntity.ok(resposta);
        }

        String firebaseToken = FirebaseAuth
                .getInstance()
                .createCustomToken(usuario.getId());



        throw new UnauthorizedException("Credenciais Invalidas");

    }

    @PutMapping("/{id}/senha")
    public void atualizarSenha(@PathVariable String id, @RequestBody UpdateSenhaDTO dto) throws ExecutionException, InterruptedException {
        service.atualizarSenha(id, dto);
    }

    @PostMapping("/sessao")
    public ResponseEntity<Usuario> sessao (@RequestBody TokenRequestDTO tokenjwtDTO) throws InterruptedException, ExecutionException{

        String uid = jwt.validarToken(tokenjwtDTO.getToken());
        Usuario usuario = service.findByEmail(uid);

        if (usuario == null) {
            throw new NotFoundException("Usuario nao encontrado");
        }
        return ResponseEntity.ok(usuario);

    }





}
