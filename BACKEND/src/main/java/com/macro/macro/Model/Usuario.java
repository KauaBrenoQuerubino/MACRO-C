package com.macro.macro.Model;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class Usuario {

    private String id;
    private String nome;
    private String email;
    private String SenhaHash;
    private String perfil;
    private String status;
    private Timestamp createdAt;
    private Timestamp updatedAt;


}
