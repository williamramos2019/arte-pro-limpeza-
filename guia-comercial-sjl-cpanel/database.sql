SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS configuracoes (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  titulo_site VARCHAR(160) NOT NULL DEFAULT 'Guia Comercial SJL',
  logo VARCHAR(255) DEFAULT NULL,
  telefone_contato VARCHAR(30) DEFAULT NULL,
  email VARCHAR(160) DEFAULT NULL,
  redes_sociais TEXT DEFAULT NULL,
  texto_rodape TEXT DEFAULT NULL,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS empresas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(180) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(30) DEFAULT NULL,
  endereco VARCHAR(255) DEFAULT NULL,
  bairro VARCHAR(120) DEFAULT NULL,
  nota DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  imagem_capa VARCHAR(255) DEFAULT NULL,
  is_destaque TINYINT(1) NOT NULL DEFAULT 0,
  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_categoria (categoria),
  INDEX idx_bairro (bairro),
  INDEX idx_destaque (is_destaque)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS postagens (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(180) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  conteudo MEDIUMTEXT NOT NULL,
  imagem VARCHAR(255) DEFAULT NULL,
  data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_publicacao (data_publicacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(80) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cliques (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  empresa_id INT UNSIGNED DEFAULT NULL,
  tipo VARCHAR(50) NOT NULL DEFAULT 'whatsapp',
  data_click DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL,
  INDEX idx_data_click (data_click)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO configuracoes (id, titulo_site, logo, telefone_contato, email, redes_sociais, texto_rodape)
VALUES (
  1,
  'Guia Comercial Completo de SJL',
  '',
  '(31) 99999-0000',
  'contato@guiasjl.com.br',
  '{"instagram":"https://instagram.com/guiasjl","facebook":"https://facebook.com/guiasjl","whatsapp":"https://wa.me/5531999990000"}',
  'O Guia Comercial de Sao Jose da Lapa conecta moradores, visitantes e empresas locais.'
)
ON DUPLICATE KEY UPDATE titulo_site = VALUES(titulo_site);

INSERT INTO usuarios (login, senha_hash)
VALUES ('admin', '$2y$10$o9XKbekxlh6a3SmuYWlFP..GcGhakf/e8UBAlYG76BHoXuPVPw2zW')
ON DUPLICATE KEY UPDATE login = VALUES(login);

INSERT INTO empresas (nome, categoria, whatsapp, endereco, bairro, nota, imagem_capa, is_destaque, data_cadastro) VALUES
('Auto Limpeza Pro', 'Automotivo', '5531999001001', 'Av. Prefeito Joao Luiz, 120', 'Centro', 5.0, '', 1, NOW()),
('Mercado Central da Lapa', 'Mercado', '5531999001002', 'Rua Padre Jose Dias, 44', 'Centro', 4.8, '', 0, NOW()),
('Padaria Pao da Serra', 'Alimentacao', '5531999001003', 'Rua Sao Jose, 88', 'Centro', 4.7, '', 0, NOW()),
('Farmacia Vida SJL', 'Saude', '5531999001004', 'Av. Brasil, 215', 'Centro', 4.9, '', 0, NOW()),
('Barbearia Dom Pedro', 'Beleza', '5531999001005', 'Rua Dom Pedro I, 39', 'Dom Pedro I', 4.6, '', 0, NOW()),
('Sabor Mineiro Restaurante', 'Alimentacao', '5531999001006', 'Rua das Acacias, 71', 'Inacia de Carvalho', 4.8, '', 0, NOW()),
('Clinica Sorriso Lapa', 'Saude', '5531999001007', 'Rua Minas Gerais, 134', 'Centro', 4.9, '', 0, NOW()),
('Academia Corpo Ativo', 'Saude', '5531999001008', 'Av. Getulio Vargas, 300', 'Dom Pedro I', 4.7, '', 0, NOW()),
('Pet Shop Amigo Fiel', 'Pet', '5531999001009', 'Rua das Palmeiras, 58', 'Inacia de Carvalho', 4.5, '', 0, NOW()),
('Constrular Materiais', 'Casa e Construcao', '5531999001010', 'Rodovia MG-424, 1010', 'Cachoeira', 4.6, '', 0, NOW()),
('Oficina Lapa Motors', 'Automotivo', '5531999001011', 'Rua do Contorno, 97', 'Centro', 4.4, '', 0, NOW()),
('Studio Bella SJL', 'Beleza', '5531999001012', 'Rua Beija-Flor, 26', 'Jardim Encantado', 4.8, '', 0, NOW()),
('Deposito Santa Luzia', 'Casa e Construcao', '5531999001013', 'Av. Principal, 455', 'Dom Pedro I', 4.3, '', 0, NOW()),
('Escola Pequenos Passos', 'Educacao', '5531999001014', 'Rua das Criancas, 22', 'Maria de Lourdes', 4.9, '', 0, NOW()),
('Pizzaria Forno da Lapa', 'Alimentacao', '5531999001015', 'Rua Italia, 17', 'Centro', 4.7, '', 0, NOW()),
('Lava Jato Brilho Total', 'Automotivo', '5531999001016', 'Rua Um, 19', 'Vila Brasil', 4.5, '', 0, NOW()),
('Drogaria Popular SJL', 'Saude', '5531999001017', 'Av. Brasil, 520', 'Inacia de Carvalho', 4.6, '', 0, NOW()),
('Loja Moda Lapa', 'Moda', '5531999001018', 'Rua Comercio, 90', 'Centro', 4.4, '', 0, NOW()),
('Tech Cell Assistencia', 'Tecnologia', '5531999001019', 'Rua Tiradentes, 75', 'Centro', 4.8, '', 0, NOW()),
('Casa das Racoes SJL', 'Pet', '5531999001020', 'Rua Rural, 12', 'Cachoeira', 4.5, '', 0, NOW()),
('Sorveteria Sol da Lapa', 'Alimentacao', '5531999001021', 'Praca Central, 7', 'Centro', 4.6, '', 0, NOW()),
('Dona Maria Marmitas', 'Alimentacao', '5531999001022', 'Rua Canaa, 118', 'Inacia de Carvalho', 4.9, '', 0, NOW()),
('Eletrica Lapa Servicos', 'Servicos', '5531999001023', 'Rua Energia, 33', 'Dom Pedro I', 4.7, '', 0, NOW()),
('Jardinagem Verde Vale', 'Servicos', '5531999001024', 'Rua das Hortensias, 66', 'Jardim Encantado', 4.4, '', 0, NOW()),
('Vidros e Box SJL', 'Casa e Construcao', '5531999001025', 'Rua Cristal, 41', 'Centro', 4.3, '', 0, NOW()),
('Boutique Flor de Minas', 'Moda', '5531999001026', 'Rua das Flores, 35', 'Maria de Lourdes', 4.6, '', 0, NOW()),
('Auto Pecas Rota 424', 'Automotivo', '5531999001027', 'Rodovia MG-424, 850', 'Cachoeira', 4.5, '', 0, NOW()),
('Clinica Bem Viver', 'Saude', '5531999001028', 'Rua Esperanca, 61', 'Inacia de Carvalho', 4.8, '', 0, NOW()),
('Espaco Fitness Lapa', 'Saude', '5531999001029', 'Rua Atleta, 18', 'Vila Brasil', 4.5, '', 0, NOW()),
('Papelaria Estudantil', 'Educacao', '5531999001030', 'Rua Escolar, 25', 'Centro', 4.4, '', 0, NOW()),
('Serralheria Sao Jose', 'Servicos', '5531999001031', 'Rua Ferro, 200', 'Dom Pedro I', 4.2, '', 0, NOW()),
('Buffet Encanto Mineiro', 'Eventos', '5531999001032', 'Rua Festas, 11', 'Jardim Encantado', 4.9, '', 0, NOW()),
('Chaveiro Lapa 24h', 'Servicos', '5531999001033', 'Av. Brasil, 77', 'Centro', 4.7, '', 0, NOW()),
('Lojao dos Calcados', 'Moda', '5531999001034', 'Rua Comercio, 101', 'Centro', 4.5, '', 0, NOW()),
('Consultorio Dr. Rafael', 'Saude', '5531999001035', 'Rua Saude, 45', 'Maria de Lourdes', 4.8, '', 0, NOW()),
('Casa do Agricultor', 'Mercado', '5531999001036', 'Estrada Rural, 4', 'Cachoeira', 4.4, '', 0, NOW()),
('Restaurante Tempero Caseiro', 'Alimentacao', '5531999001037', 'Rua Familia, 31', 'Dom Pedro I', 4.7, '', 0, NOW()),
('Salao Tesoura de Ouro', 'Beleza', '5531999001038', 'Rua Beleza, 9', 'Inacia de Carvalho', 4.6, '', 0, NOW()),
('Informatica LapaNet', 'Tecnologia', '5531999001039', 'Rua Digital, 50', 'Centro', 4.5, '', 0, NOW()),
('Lavanderia Roupa Nova', 'Servicos', '5531999001040', 'Rua Algodao, 14', 'Vila Brasil', 4.6, '', 0, NOW()),
('Emporio da Lapa', 'Mercado', '5531999001041', 'Rua Sabores, 83', 'Centro', 4.7, '', 0, NOW()),
('Dental Prime SJL', 'Saude', '5531999001042', 'Rua Minas Gerais, 88', 'Centro', 4.9, '', 0, NOW()),
('Garagem Beer SJL', 'Lazer', '5531999001043', 'Rua Encontro, 76', 'Jardim Encantado', 4.6, '', 0, NOW()),
('Mecanica Dois Irmaos', 'Automotivo', '5531999001044', 'Rua Oficina, 144', 'Dom Pedro I', 4.5, '', 0, NOW()),
('Floricultura Jardim Lapa', 'Servicos', '5531999001045', 'Rua Orquideas, 28', 'Maria de Lourdes', 4.8, '', 0, NOW()),
('Rei do Acai SJL', 'Alimentacao', '5531999001046', 'Rua Tropical, 10', 'Centro', 4.6, '', 0, NOW()),
('Moveis Planejados Carvalho', 'Casa e Construcao', '5531999001047', 'Rua Madeira, 222', 'Inacia de Carvalho', 4.7, '', 0, NOW()),
('Centro Automotivo Prime', 'Automotivo', '5531999001048', 'Av. das Industrias, 310', 'Vila Brasil', 4.4, '', 0, NOW()),
('Cursos Futuro SJL', 'Educacao', '5531999001049', 'Rua Conhecimento, 55', 'Centro', 4.5, '', 0, NOW()),
('Refrigeracao Gelar', 'Servicos', '5531999001050', 'Rua Frio, 72', 'Dom Pedro I', 4.6, '', 0, NOW());

INSERT INTO postagens (titulo, slug, conteudo, imagem, data_publicacao) VALUES
('Como escolher bons prestadores em Sao Jose da Lapa', 'como-escolher-bons-prestadores-em-sjl', '<p>Antes de contratar, compare avaliacoes, localizacao e canais de atendimento. O Guia Comercial de SJL ajuda voce a encontrar empresas proximas e confiaveis.</p><p>Prefira negocios com informacoes atualizadas e atendimento rapido pelo WhatsApp.</p>', '', NOW()),
('Auto Limpeza Pro e destaque premium do Guia SJL', 'auto-limpeza-pro-destaque-premium', '<p>A Auto Limpeza Pro aparece como Parceiro Master por oferecer atendimento automotivo com foco em qualidade, agilidade e cuidado nos detalhes.</p>', '', NOW()),
('Bairros de SJL ganham mais visibilidade comercial', 'bairros-de-sjl-ganham-visibilidade-comercial', '<p>Centro, Inacia de Carvalho, Dom Pedro I, Cachoeira e outros bairros passam a contar com uma vitrine digital simples para moradores encontrarem servicos locais.</p>', '', NOW());

COMMIT;
