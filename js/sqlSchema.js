// BusKid PostgreSQL / Supabase Database Schema Script & Metadata
export const BUSKID_SQL_SCHEMA = `-- ============================================================
-- BUSKID DATABASE SCHEMA (PostgreSQL / Supabase)
-- Plataforma Inteligente de Transporte Escolar
-- ============================================================

-- 1. TABELA DE USUÁRIOS E AUTENTICAÇÃO MULTI-PERFIL
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    tipo_perfil VARCHAR(20) NOT NULL CHECK (tipo_perfil IN ('ADMIN', 'MOTORISTA', 'ESCOLA', 'RESPONSAVEL')),
    foto_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABELA DE VEÍCULOS (PERUAS / VANS ESCOLARES)
CREATE TABLE veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    motorista_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    modelo VARCHAR(80) NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    ano INTEGER NOT NULL,
    capacidade_lugares INTEGER NOT NULL DEFAULT 19,
    cor VARCHAR(40) DEFAULT 'Amarelo Escolar',
    odometro_km INTEGER DEFAULT 0,
    selo_detran VARCHAR(50),
    data_vistoria DATE,
    validade_tacografo DATE,
    foto_veiculo_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE ESCOLAS
CREATE TABLE escolas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    endereco TEXT NOT NULL,
    bairro VARCHAR(80),
    cidade VARCHAR(80) DEFAULT 'São Paulo',
    telefone VARCHAR(20),
    coordenador_nome VARCHAR(100),
    horario_entrada TIME DEFAULT '07:30:00',
    horario_saida TIME DEFAULT '12:15:00'
);

-- 4. TABELA DE ALUNOS
CREATE TABLE alunos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    responsavel_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    escola_id UUID NOT NULL REFERENCES escolas(id),
    veiculo_id UUID REFERENCES veiculos(id),
    nome VARCHAR(120) NOT NULL,
    idade INTEGER,
    turma_serie VARCHAR(50),
    endereco_coleta TEXT NOT NULL,
    bairro VARCHAR(80),
    valor_mensalidade NUMERIC(10,2) NOT NULL DEFAULT 400.00,
    dia_vencimento INTEGER DEFAULT 10,
    observacoes_medicas TEXT,
    foto_aluno_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABELA DE ROTAS E CHAMADAS DIÁRIAS (EMBARQUES)
CREATE TABLE embarques_diarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    veiculo_id UUID NOT NULL REFERENCES veiculos(id),
    data_rota DATE NOT NULL DEFAULT CURRENT_DATE,
    turno VARCHAR(15) NOT NULL CHECK (turno IN ('MANHA_IDA', 'MANHA_VOLTA', 'TARDE_IDA', 'TARDE_VOLTA')),
    status_embarque VARCHAR(20) NOT NULL DEFAULT 'AGUARDANDO' 
        CHECK (status_embarque IN ('AGUARDANDO', 'EMBARCOU', 'NA_ESCOLA', 'ENTREGUE_EM_CASA', 'FALTOU')),
    horario_registro TIMESTAMP WITH TIME ZONE,
    observacao TEXT
);

-- 6. TABELA DE MENSALIDADES E PAGAMENTOS PIX
CREATE TABLE mensalidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID NOT NULL REFERENCES alunos(id),
    mes_referencia VARCHAR(7) NOT NULL, -- Ex: '2026-08'
    valor NUMERIC(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PAGO', 'PENDENTE', 'ATRASADO')),
    data_pagamento TIMESTAMP WITH TIME ZONE,
    comprovante_pix_id TEXT,
    qrcode_pix_payload TEXT
);

-- 7. TABELA DE MANUTENÇÃO E DESPESAS DO VEÍCULO
CREATE TABLE manutencoes_veiculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    veiculo_id UUID NOT NULL REFERENCES veiculos(id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('Combustível', 'Manutenção', 'Documentação', 'Seguro', 'Outros')),
    descricao VARCHAR(200) NOT NULL,
    odometro_km INTEGER,
    valor NUMERIC(10,2) NOT NULL,
    data_registro DATE DEFAULT CURRENT_DATE
);

-- INDICES PARA ALTA PERFORMANCE NAS CONSULTAS EM TEMPO REAL
CREATE INDEX idx_embarques_data_turno ON embarques_diarios(data_rota, turno);
CREATE INDEX idx_alunos_veiculo ON alunos(veiculo_id);
CREATE INDEX idx_mensalidades_status ON mensalidades(status);
`;
