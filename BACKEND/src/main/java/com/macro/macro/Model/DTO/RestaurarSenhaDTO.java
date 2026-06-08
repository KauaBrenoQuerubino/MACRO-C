package com.macro.macro.Model.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RestaurarSenhaDTO {
    private String id;
    private String Email;
    private String token;
    private String dataExpiracao;
}
