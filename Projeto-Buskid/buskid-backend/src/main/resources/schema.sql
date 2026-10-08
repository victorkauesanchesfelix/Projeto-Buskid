PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tb_usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo_perfil TEXT CHECK(tipo_perfil IN ('ADMIN', 'PERUEIRO', 'RESPONSAVEL')) NOT NULL,
    ativo BOOLEAN DEFAULT 1
);

CREATE TABLE IF NOT EXISTS tb_plano (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    valor_mensal REAL DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS tb_assinatura (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER UNIQUE NOT NULL,
    plano_id INTEGER NOT NULL,
    status TEXT DEFAULT 'ATIVO',
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (plano_id) REFERENCES tb_plano(id)
);

CREATE TABLE IF NOT EXISTS tb_aluno (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    endereco TEXT,
    bairro TEXT,
    latitude REAL,
    longitude REAL,
    status TEXT DEFAULT 'AGUARDANDO',
    horario_status TEXT,
    nome_pais TEXT,
    telefone_pais TEXT
);

INSERT OR IGNORE INTO tb_plano (id, nome, descricao, valor_mensal) VALUES 
(1, 'BASICO', 'Plano gratuito básico', 0.00),
(2, 'PREMIUM', 'Plano completo com notificações e GPS ao vivo', 9.90);

INSERT OR IGNORE INTO tb_usuario (id, nome, email, senha, tipo_perfil) VALUES 
(1, 'Mariana Mendes', 'mariana@email.com', '123456', 'RESPONSAVEL'),
(2, 'Tio Carlos', 'carlos@email.com', '123456', 'PERUEIRO'),
(3, 'Administrador', 'admin@buskid.com', 'admin123', 'ADMIN');

INSERT OR IGNORE INTO tb_assinatura (id, usuario_id, plano_id, status) VALUES 
(1, 1, 2, 'ATIVO');

INSERT OR IGNORE INTO tb_aluno (id, nome, endereco, bairro, latitude, longitude, status, nome_pais, telefone_pais) VALUES 
('std_01', 'Sofia Mendes', 'Rua das Flores, 120 - Ap 42', 'Jardim América', -23.5580, -46.6570, 'AGUARDANDO', 'Mariana Mendes', '5511991238877');
