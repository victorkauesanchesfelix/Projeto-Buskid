package com.buskid.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_aluno")
public class Aluno {
    @Id
    private String id;
    private String nome;
    private String endereco;
    private String bairro;
    private Double latitude;
    private Double longitude;
    private String status;

    @Column(name = "horario_status")
    private String horarioStatus;

    @Column(name = "nome_pais")
    private String nomePais;

    @Column(name = "telefone_pais")
    private String telefonePais;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getHorarioStatus() { return horarioStatus; }
    public void setHorarioStatus(String horarioStatus) { this.horarioStatus = horarioStatus; }
    public String getNomePais() { return nomePais; }
    public void setNomePais(String nomePais) { this.nomePais = nomePais; }
    public String getTelefonePais() { return telefonePais; }
    public void setTelefonePais(String telefonePais) { this.telefonePais = telefonePais; }
}
