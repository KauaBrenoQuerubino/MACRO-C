package com.macro.macro.Model;

import com.macro.macro.Model.DTO.RequisicaoDTO;
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
    private List<RequisicaoDTO> requisicoes;
    private String descricao;

    private String status;
    private String healthEndpoint;
    private Long responseTime;

    private String createdAt;
    private String updatedAt;

}
