package com.macro.macro.Until;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String encode(String senha) {
        return encoder.encode(senha);
    }

    public static boolean matches(String senhaDigitada, String senhaHash) {
        return encoder.matches(senhaDigitada, senhaHash);
    }
}
