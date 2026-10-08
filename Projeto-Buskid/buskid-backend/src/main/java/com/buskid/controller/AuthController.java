package com.buskid.controller;

import com.buskid.model.Usuario;
import com.buskid.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String senha = credentials.get("senha");

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null || !usuario.getSenha().equals(senha)) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        String plano = (usuario.getAssinatura() != null && usuario.getAssinatura().getPlano() != null)
                ? usuario.getAssinatura().getPlano().getNome()
                : "BASICO";

        Map<String, Object> response = new HashMap<>();
        response.put("id", usuario.getId());
        response.put("nome", usuario.getNome());
        response.put("email", usuario.getEmail());
        response.put("tipoPerfil", usuario.getTipoPerfil());
        response.put("plano", plano);

        return ResponseEntity.ok(response);
    }
}
