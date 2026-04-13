package com.macro.macro.Model;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class Log {

    private String id;
    private Usuario usuario;
    private String acao;
    private String descricao;
    private Timestamp data;

}
