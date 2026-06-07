package com.macro.macro.Model;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class Log {

    private String id;
    private String usuarioid;
    private String acao;
    private String descricao;
    private String data;

}
