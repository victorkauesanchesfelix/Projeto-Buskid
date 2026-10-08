package com.buskid.controller;

import com.buskid.model.Aluno;
import com.buskid.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> dashboard = new HashMap<>();

        // 1. Motorista & Localização
        Map<String, Object> driver = new HashMap<>();
        driver.put("id", "drv_01");
        driver.put("name", "Carlos Eduardo (Tio Carlos)");
        driver.put("phone", "(11) 98765-4321");

        Map<String, Object> currentLocation = new HashMap<>();
        currentLocation.put("lat", -23.5550);
        currentLocation.put("lng", -46.6600);
        driver.put("currentLocation", currentLocation);

        // 2. Escola
        Map<String, Object> school = new HashMap<>();
        school.put("id", "sch_01");
        school.put("name", "Escola Cantinho do Saber");
        school.put("lat", -23.5650);
        school.put("lng", -46.6400);

        // 3. Lista de Alunos (Buscados diretamente do Banco SQLite)
        List<Aluno> alunosDoBanco = alunoRepository.findAll();
        List<Map<String, Object>> studentsList = new ArrayList<>();

        for (Aluno a : alunosDoBanco) {
            Map<String, Object> std = new HashMap<>();
            std.put("id", a.getId());
            std.put("name", a.getNome());
            std.put("address", a.getEndereco());
            std.put("neighborhood", a.getBairro());
            std.put("lat", a.getLatitude());
            std.put("lng", a.getLongitude());
            std.put("status", a.getStatus());
            std.put("statusTime", a.getHorarioStatus());
            std.put("parentName", a.getNomePais());
            std.put("parentPhone", a.getTelefonePais());
            std.put("pickupETA", "07:10");
            std.put("photo", "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80");
            studentsList.add(std);
        }

        // 4. Financeiro Mocado/Exemplo
        Map<String, Object> financials = new HashMap<>();
        financials.put("records", new ArrayList<>());

        // Monta o Objeto Final para o app.js
        dashboard.put("driver", driver);
        dashboard.put("school", school);
        dashboard.put("studentsList", studentsList);
        dashboard.put("financials", financials);
        dashboard.put("maintenanceLogs", new ArrayList<>());

        return ResponseEntity.ok(dashboard);
    }
}