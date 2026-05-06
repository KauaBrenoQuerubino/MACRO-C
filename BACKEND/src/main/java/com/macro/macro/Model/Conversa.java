package com.macro.macro.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Conversa {

    private String id;
    private List<String> participantesId;
    private String dataCriacao;

}
