package com.macro.macro.Interceptor;

import com.macro.macro.Model.Log;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Service.Auth.TokenJWT;
import com.macro.macro.Service.LogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDate;

@Component
public class LogInterceptor implements HandlerInterceptor {

    @Autowired
    LogService service;

    @Autowired
    TokenJWT jwt;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {



        String endpoint = request.getRequestURI();
        String metodo = request.getMethod();
        String token = request.getHeader("Authorization");

        if (endpoint.startsWith("/auth")) {
            return true;
        }

        String usuario = extrairUsuario(token);

        Log log = new Log();

        log.setUsuarioid(usuario);
        log.setAcao(endpoint);
        log.setDescricao(metodo);
        log.setData(String.valueOf(LocalDate.now()));

        System.out.println(usuario + endpoint + metodo);

        service.save(log);
        return true;
    }

    private String extrairUsuario(String token) {

        String TokenFormatado = token.split(" ")[1];

        String idUsuario = jwt.validarToken(TokenFormatado);

        return idUsuario;
    }

}
