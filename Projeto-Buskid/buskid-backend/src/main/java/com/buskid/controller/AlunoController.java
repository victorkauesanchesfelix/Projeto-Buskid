package com.buskid.controller;

import com.buskid.model.Aluno;
import com.buskid.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        if (aluno == null) return ResponseEntity.notFound().build();

        aluno.setStatus(body.get("status"));
        aluno.setHorarioStatus(body.get("horario"));
        alunoRepository.save(aluno);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/falta")
    public ResponseEntity<?> registrarFalta(@PathVariable String id, @RequestBody Map<String, String> body) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        if (aluno == null) return ResponseEntity.notFound().build();

        aluno.setStatus("FALTOU");
        aluno.setHorarioStatus("Aviso: " + body.get("motivo"));
        alunoRepository.save(aluno);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/desfazer-falta")
    public ResponseEntity<?> desfazerFalta(@PathVariable String id) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        if (aluno == null) return ResponseEntity.notFound().build();

        aluno.setStatus("AGUARDANDO");
        aluno.setHorarioStatus(null);
        alunoRepository.save(aluno);

        return ResponseEntity.ok().build();
    }
}
