document.addEventListener("DOMContentLoaded", () => {
  const vendaForm = document.getElementById("vendaForm");
  const message = document.getElementById("message");
  const infoCadastro = document.getElementById("infoCadastro");

  function getEmpresas() {
    return JSON.parse(localStorage.getItem("empresas")) || [];
  }

  function getClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
  }

  function getProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
  }

  function getEstoque() {
    return JSON.parse(localStorage.getItem("estoque")) || [];
  }

  function saveEstoque(estoque) {
    localStorage.setItem("estoque", JSON.stringify(estoque));
  }

  function populateSelect(selectElement, items, itemName) {
    if (items.length === 0) {
      selectElement.innerHTML = `<option value='' disabled>Nenhum ${itemName} cadastrado</option>`;
      selectElement.disabled = true;
    } else {
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.codigo || item.cnpj || item.cpf;
        option.textContent =
          item.nome || item.nomeFantasia || item.razaoSocial || item.descricao;
        selectElement.appendChild(option);
      });
    }
  }

  function verificarInformacoesDeVenda() {
    const clientes = getClientes();
    const produtos = getProdutos();
    const estoque = getEstoque();

    if (clientes.length === 0) {
      infoCadastro.innerHTML = "<span>Nenhum cliente cadastrado. </span>";
    }

    if (produtos.length === 0) {
      infoCadastro.innerHTML += "<span>Nenhum produto cadastrado. </span>";
    }

    if (estoque.length === 0) {
      infoCadastro.innerHTML += "<span>Nenhum produto em estoque.</span>";
    }
  }

  function getProdutoByCodigo(codigo) {
    const produtos = getProdutos();
    return produtos.find((produto) => produto.codigo === codigo);
  }

  function getEstoqueByProdutoCodigo(codigo) {
    const estoque = getEstoque();
    return estoque.find((item) => item.codigo === codigo);
  }

  verificarInformacoesDeVenda();
  populateSelect(document.getElementById("empresa"), getEmpresas(), "empresa");
  populateSelect(document.getElementById("cliente"), getClientes(), "cliente");
  populateSelect(document.getElementById("produto"), getProdutos(), "produto");

  vendaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(vendaForm);
    const produtoCodigo = formData.get("produto");
    const quantidade = parseInt(formData.get("quantidade"));
    const desconto = parseFloat(formData.get("desconto"));
    const valorPago = parseFloat(formData.get("valorPago"));

    const produto = getProdutoByCodigo(produtoCodigo);
    const itemEstoque = getEstoqueByProdutoCodigo(produtoCodigo);

    if (!produto || !itemEstoque) {
      alert("Produto não encontrado no estoque.");
      return;
    }

    if (quantidade > itemEstoque.quantidadeEstoque) {
      alert("Quantidade em estoque insuficiente.");
      return;
    }

    const valorProduto = Number(
      produto.valorPromocional > 0 ? produto.valorPromocional : produto.valor
    );
    const totalSemDesconto = valorProduto * quantidade;
    const totalComDesconto =
      totalSemDesconto - totalSemDesconto * (desconto / 100);
    console.log(valorProduto);
    console.log(totalSemDesconto);
    console.log(totalComDesconto);
    console.log(valorPago);
    if (valorPago < totalComDesconto) {
      alert("Valor pago é insuficiente para a venda.");
      return;
    }

    const troco = valorPago - totalComDesconto;

    // Atualizar o item vendido no estoque
    itemEstoque.quantidadeEstoque -= quantidade;
    // Atualizar o estoque
    let estoque = getEstoque();
    estoque = estoque.map((item) => {
      if (item.codigo === itemEstoque.codigo) {
        return itemEstoque;
      }
      return item;
    });
    // Salvar o estoque atualizado
    saveEstoque(estoque);

    alert(`Venda concluída com sucesso. Troco: R$ ${troco.toFixed(2)}`);

    setTimeout(() => {
      message.textContent = "";
      message.removeAttribute("class");
    }, 5000);

    vendaForm.reset();
  });
});
