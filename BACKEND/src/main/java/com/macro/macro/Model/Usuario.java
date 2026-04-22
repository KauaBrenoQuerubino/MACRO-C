package com.macro.macro.Model;


import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;




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
