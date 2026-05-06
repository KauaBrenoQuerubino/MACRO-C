package com.macro.macro.Model.DTO;


import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Setter
@Getter
public class RequisicaoDTO {
    private String endpoints;
    private String metodo;
    private Map<String, String> headers;
    private Map<String, Object> queryParams;
    private Object body;
}