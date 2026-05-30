package com.macro.macro.Model.DTO;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UsuarioDTO {
    private String FotoPerfil;
    private String nome;
    private String email;
    private String senha;
    private String perfil;
    private String status;
}
