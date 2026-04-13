package com.macro.macro.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;

@Getter
@Setter
public class Conversa {

    private String id;
    private ArrayList<Usuario> participantes;
    private Timestamp dataCriacao;
    private ArrayList<Mensagem> mensagens;

}
