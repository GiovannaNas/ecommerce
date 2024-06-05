-- Script de criação do banco de dados e tabelas
-- Autor: Giovanna Alves do Nascimento

CREATE DATABASE estoque_vendas;


USE estoque_vendas;


CREATE TABLE empresa (
    empresa_id INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100),
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(30),
    data_cadastro DATE NOT NULL,
    telefone VARCHAR(20),
    celular VARCHAR(20),
    contato VARCHAR(30),
    endereco_completo VARCHAR(100)
);


CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    data_nascimento DATE,
    sexo BOOLEAN,
    endereco VARCHAR(50),
    cep VARCHAR(8),
    bairro VARCHAR(20),
    numero VARCHAR(5),
    complemento VARCHAR(50),
    cidade VARCHAR(20),
    estado VARCHAR(20)
);


CREATE TABLE produto (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    quantidade INT,
    valor FLOAT NOT NULL,
    valor_promocional FLOAT,
    data_inicio_promocao DATE,
    data_fim_promocao DATE,
    FOREIGN KEY (empresa_id) REFERENCES empresa (empresa_id)
);


CREATE TABLE venda (
    venda_id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_venda DATE NOT NULL,
    total_pago FLOAT,
    FOREIGN KEY (empresa_id) REFERENCES empresa (empresa_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente (cliente_id)
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
