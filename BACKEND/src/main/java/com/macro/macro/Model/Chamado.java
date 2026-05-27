package com.macro.macro.Model;

import com.macro.macro.Model.ENUM.EStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


@Getter
@Setter
public class Chamado {

    private String id;
    private String titulo;
    private String descricao;
    private String prioridade;
    private String status;
    private String usuarioId;
    private String responsavelId;
    private String categoria;
    private Date prazo;
    private Boolean atrasado;
    private List<String> Comentarios;
    private Date createdAt;
    private Date updatedAt;

}
