package com.macro.macro.Model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUsuarioDTO {
    private String fotoPerfil;
    private String nome;
    private String email;
    private String perfil;
    private String status;
}