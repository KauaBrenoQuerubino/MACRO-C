package com.macro.macro.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;


@Setter
@Getter
public class Microservico {

    private String id;
    private String nome;
    private String url;
    private List<String> endpoints;
    private int number;
    private String descricao;
    private String status;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
