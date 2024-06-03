CREATE DATABASE estoque_vendas;

USE estoque_vendas;

CREATE TABLE empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    data_cadastro DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    celular VARCHAR(20),
    contato VARCHAR(255),
    endereco VARCHAR(255)
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    data_cadastro DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    celular VARCHAR(20),
    endereco VARCHAR(255)
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    codigo_produto VARCHAR(50) NOT NULL UNIQUE,
    valor DECIMAL(10, 2) NOT NULL,
    valor_promocional DECIMAL(10, 2),
    data_inicio_promocao DATE,
    data_fim_promocao DATE,
    data_cadastro DATE NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL
);

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    valor_produto DECIMAL(10, 2) NOT NULL,
    data_cadastro DATE NOT NULL,
    quantidade_vendida INT DEFAULT 0,
    quantidade_estoque INT NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_venda DATE NOT NULL,
    desconto DECIMAL(5, 2),
    total_sem_desconto DECIMAL(10, 2) NOT NULL,
    total_com_desconto DECIMAL(10, 2) NOT NULL,
    valor_pago DECIMAL(10, 2) NOT NULL,
    troco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE venda_produto (
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(10, 2) NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (venda_id, produto_id),
    FOREIGN KEY (venda_id) REFERENCES venda(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

