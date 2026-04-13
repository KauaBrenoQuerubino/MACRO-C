package com.macro.macro.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class Chamado {

    private String id;
    private String titulo;
    private String descricao;
    private String prioridade;
    private String status;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
