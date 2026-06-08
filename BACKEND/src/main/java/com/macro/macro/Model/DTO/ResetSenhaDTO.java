package com.macro.macro.Model.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetSenhaDTO {

    private String email;
    private String novaSenha;
    private String token;


}
