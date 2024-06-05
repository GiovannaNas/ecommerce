-- Script de criação do banco de dados e tabelas
-- Autor: Giovanna Alves do Nascimento

CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE,
    data_cadastro DATE NOT NULL,
    email VARCHAR(20),
    telefone VARCHAR(14),
    celular VARCHAR(14),
    endereco_completo VARCHAR(100)
);

CREATE TABLE produto (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    codigo_produto VARCHAR(100) NOT NULL UNIQUE,
    valor FLOAT NOT NULL,
    valor_promocional FLOAT,
    data_inicio_promocao DATE,
    data_fim_promocao DATE,
    data_cadastro DATE NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa (empresa_id)
);
CREATE TABLE estoque (
    estoque_id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    nome_produto VARCHAR(100) NOT NULL,
    valor_produto FLOAT NOT NULL,
    data_cadastro DATE NOT NULL,
    quantidade_vendida INT DEFAULT 0,
    quantidade_estoque INT NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produto (produto_id)
);

CREATE TABLE venda_produto (
    venda_produto_id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    valor_unitario FLOAT NOT NULL,
    quantidade INT NOT NULL,
    valor_total FLOAT NOT NULL,
    desconto_percent FLOAT,
    valor_total_sem_desconto FLOAT,
    FOREIGN KEY (venda_id) REFERENCES venda (venda_id),
    FOREIGN KEY (produto_id) REFERENCES produto (produto_id)
);
