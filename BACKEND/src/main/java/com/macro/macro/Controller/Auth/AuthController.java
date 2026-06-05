package com.macro.macro.Controller.Auth;


import com.google.firebase.auth.FirebaseAuthException;
import com.macro.macro.Model.DTO.LoginDTO;
import com.macro.macro.Model.DTO.TokenRequestDTO;
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

        Usuario usuario = service.findByEmail(loginDTO.getEmail());

        Map<String, Object> resposta = new HashMap<>();

        if (usuario == null) {
            resposta.put("mensagem", "Credenciais nao encontradas");
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(resposta);
        }

        else if (PasswordUtil.matches(loginDTO.getSenha(), usuario.getSenhaHash())) {
            String token = jwt.gerarToken(usuario);
            resposta.put("mensagem", "Login efetuado com sucesso");
            resposta.put("id", usuario.getId());
            resposta.put("token", token);

            return ResponseEntity.ok(resposta);
        }

        String firebaseToken = FirebaseAuth
                .getInstance()
                .createCustomToken(usuario.getId());


        resposta.put("firebaseToken", firebaseToken);
        resposta.put("mensagem", "Erro ao efetuar o Login");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resposta);

    }

    @PostMapping("/sessao")
    public ResponseEntity<Usuario> sessao (@RequestBody TokenRequestDTO tokenjwtDTO) throws InterruptedException, ExecutionException{

        String uid = jwt.validarToken(tokenjwtDTO.getToken());
        Usuario usuario = service.findByEmail(uid);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(usuario);

    }





}
