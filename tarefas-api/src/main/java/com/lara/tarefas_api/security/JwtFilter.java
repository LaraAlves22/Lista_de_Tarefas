package com.lara.tarefas_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

@Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    System.out.println("=== FILTRO EXECUTOU ===");
    System.out.println("URI: " + request.getRequestURI());
    System.out.println("Authorization: " + request.getHeader("Authorization"));

    String authHeader = request.getHeader("Authorization");

    System.out.println("=== JWT FILTER ===");
    System.out.println("URI: " + request.getRequestURI());
    System.out.println("Method: " + request.getMethod());
    System.out.println("Authorization header: " + authHeader);

    if (authHeader != null && authHeader.startsWith("Bearer ")) {

        String token = authHeader.substring(7);

        System.out.println("Token válido: " + jwtUtil.validarToken(token));

        if (jwtUtil.validarToken(token)) {

            String username = jwtUtil.extrairUsername(token);

            System.out.println("Username: " + username);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of()
                    );

            auth.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(auth);
        }
    }

    filterChain.doFilter(request, response);
}
}