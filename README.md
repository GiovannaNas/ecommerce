# Projeto Vendas de empresa
Projeto simulando vendas de uma empresa.

Para que uma venda seja efetivada é necessário: 

1 - Uma empresa Cadastrada <br>
2 - Um CLiente Cadastrado <br>
3 - Um produto cadastrado <br>
4 - Produto cadastrado no estoque <br>

Todos os dados estão mockados e salvos em localStorage para facilitar o desenvolvimento.

O sistema faz todas as verificações necessárias para que a venda seja realizada. Calcula valor do desconto na hora da venda. Realiza o calculo de troco.

## Extras
Todas as telas são totalmente responsivas podendo ser acessadas em qualquer disposivos.
Páginas de visualições simples dos itens cadastrados
Feedback das ações do usuário
Design reutilizável e agradável
Utilizado somente HTML, CSS e JavaScipt no desenvolvimento evitando bibliotecas terceiras.

## Visualizar o Projeto
Abra o arquivo index.html dentro da pasta src/pages/index.html ou qualquer outro arquivo HTML e o projeto será aberto em seu navegador.

# Criação do Banco de Dados e Tabelas
Este documento explica o processo de criação do banco de dados e suas respectivas tabelas, focado em um sistema de gestão de estoque e vendas. 

- Criação do Banco de Dados
1.Criação do Banco de Dados: O banco de dados é criado com o comando CREATE DATABASE estoque_vendas;. Esse comando inicializa um novo banco de dados chamado estoque_vendas.
2.Seleção do Banco de Dados: Após a criação, o banco de dados estoque_vendas é selecionado para uso com o comando USE estoque_vendas;. Isso garante que todas as operações subsequentes sejam realizadas no banco de dados recém-criado.

- Criação das Tabelas
1.Tabela empresa:
Descrição: Armazena informações das empresas que oferecem produtos para venda.
Campos Principais: Incluem identificador único (empresa_id), razão social, CNPJ (único), e data de cadastro. Campos adicionais incluem nome fantasia, email, telefone, celular, contato e endereço completo.
Restrições: A chave primária é empresa_id, que é auto incrementado. O CNPJ é único para evitar duplicações.

2.Tabela cliente:
Descrição: Contém informações dos clientes.
Campos Principais: Incluem identificador único (cliente_id), nome do cliente, e data de nascimento. Campos adicionais abrangem sexo, endereço, CEP, bairro, número, complemento, cidade e estado.
Restrições: A chave primária é cliente_id, que é auto incrementado.

3.Tabela produto:
Descrição: Guarda informações sobre os produtos disponíveis para venda.
Campos Principais: Incluem identificador único (produto_id), referência à empresa (empresa_id), descrição do produto, e valor. Campos adicionais incluem quantidade, valor promocional e datas de promoção.
Restrições: A chave primária é produto_id, que é auto incrementado. A tabela possui uma chave estrangeira empresa_id, que referencia a tabela empresa.
Tabela venda:

4.Descrição: Registra as vendas realizadas.
Campos Principais: Incluem identificador único (venda_id), referência à empresa (empresa_id), referência ao cliente (cliente_id), e data da venda. O campo adicional é o total pago.
Restrições: A chave primária é venda_id, que é auto incrementado. A tabela possui chaves estrangeiras empresa_id e cliente_id, que referenciam as tabelas empresa e cliente respectivamente.
Tabela venda_produto:

5.Descrição: Detalha os produtos vendidos em cada venda.
Campos Principais: Incluem identificador único (venda_produto_id), referência à venda (venda_id), referência ao produto (produto_id), valor unitário, quantidade e valor total. Campos adicionais incluem percentual de desconto e valor total sem desconto.
Restrições: A chave primária é venda_produto_id, que é auto incrementado. A tabela possui chaves estrangeiras venda_id e produto_id, que referenciam as tabelas venda e produto respectivamente.

### Considerações Finais
- Chaves Estrangeiras: As tabelas produto, venda, e venda_produto possuem chaves estrangeiras que asseguram a integridade referencial entre as tabelas.
- Integridade dos Dados: Restrições como NOT NULL e UNIQUE são aplicadas para garantir a integridade e a unicidade dos dados inseridos no banco.
- Campos de Cadastro: Cada tabela relevante possui um campo para registrar a data de cadastro, o que facilita o controle e auditoria dos dados.
