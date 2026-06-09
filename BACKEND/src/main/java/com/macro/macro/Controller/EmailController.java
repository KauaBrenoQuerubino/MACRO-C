package com.macro.macro.Controller;


import com.macro.macro.Model.DTO.EmailDTO;
import com.macro.macro.Model.DTO.PasswordResetTokenDTO;
import com.macro.macro.Model.DTO.ResetSenhaDTO;
import com.macro.macro.Model.DTO.TokenRequestDTO;
import com.macro.macro.Service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    EmailService service;

    @PostMapping("/forgotPassword")
    public void restaurarSenha(@RequestBody EmailDTO dto) {
        try {
            service.enviarEmail(dto.getEmail());
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/validarCodigo")
    public void validarCodigo(@RequestBody PasswordResetTokenDTO dto) throws ExecutionException, InterruptedException {
        service.validarCodigo(dto);
    }

    @PostMapping("/novaSenha")
    public void novaSenha(@RequestBody ResetSenhaDTO dto) throws ExecutionException, InterruptedException {
        System.out.println(dto.getNovaSenha());
        service.novaSenha(dto);
    }

}
