package com.macro.macro.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class Mensagem {

    private String id;
    private Usuario idRemetente;
    private Usuario idDestinatario;
    private String conteudo;
    private String dataEnvio;


}
