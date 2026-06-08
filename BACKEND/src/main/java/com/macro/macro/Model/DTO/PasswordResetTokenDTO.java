package com.macro.macro.Model.DTO;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordResetTokenDTO {

    private String token;
    private String email;
}
