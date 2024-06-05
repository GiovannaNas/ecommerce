document.addEventListener("DOMContentLoaded", () => {
  console.log('carregou')
  const estoqueForm = document.getElementById("estoqueForm");
  const message = document.getElementById("message");
  const estoqueContainer = document.getElementById("estoque");

  function getProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
  }

  function getEstoque() {
    return JSON.parse(localStorage.getItem("estoque")) || [];
  }

  function saveEstoque(estoque) {
    localStorage.setItem("estoque", JSON.stringify(estoque));
  }

  function renderEstoque() {
    const estoque = getEstoque();
    const produtos = getProdutos();

    estoqueContainer.innerHTML = "";

    if (estoque.length === 0) {
      estoqueContainer.innerHTML = "<p>Nenhum produto em estoque.</p>";

      if (produtos.length === 0) {
        estoqueContainer.innerHTML = "<p>Nenhum produto cadastrado. <a href='cadastro-produto.html'>Cadastrar Produto</a>.</p>";
      }

      return;
    }

    estoque.forEach((item, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productHeader = document.createElement("div");
      productHeader.classList.add("product-header");

      const productTitle = document.createElement("h3");
      productTitle.textContent = `${item.descricao} (Código: ${item.codigo})`;

      const removeButton = document.createElement("button");
      removeButton.setAttribute("class", "remove-button");
      removeButton.textContent = "Remover";
      removeButton.onclick = () => {
        const estoque = getEstoque();
        estoque.splice(index, 1);
        saveEstoque(estoque);
        renderEstoque();
      };

      productHeader.appendChild(productTitle);
      productHeader.appendChild(removeButton);

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");

      productDetails.innerHTML = `
        <p>Valor: R$ ${item.valor}</p>
        <p>Data de Cadastro: ${item.dataCadastro}</p>
        <p>Quantidade Vendida: ${item.quantidadeVendida || 0}</p>
        <p>Quantidade em Estoque: ${item.quantidadeEstoque}</p>
        <p>Status: ${item.quantidadeEstoque > 0 ? "Disponível" : "Indisponível"}</p>
      `;

      const adjustQuantityForm = document.createElement("form");
      adjustQuantityForm.innerHTML = `
        <label for="quantidade">Alterar Quantidade:</label>
        <input type="number" min="0" id="quantidade_${index}" name="quantidade" required>
        <button type="submit" class="atualizar-button">Atualizar</button>
      `;
      adjustQuantityForm.onsubmit = (e) => {
        e.preventDefault();
        const quantidade = parseInt(document.getElementById(`quantidade_${index}`).value);
        item.quantidadeEstoque += quantidade;
        saveEstoque(estoque);
        renderEstoque();
      };

      productDiv.appendChild(productHeader);
      productDiv.appendChild(productDetails);
      productDiv.appendChild(adjustQuantityForm);

      estoqueContainer.appendChild(productDiv);
    });
  }

  function populateProdutoSelect() {
    const produtoSelect = document.getElementById("produto");
    const produtos = getProdutos();

    if (produtos.length === 0) {
      produtoSelect.innerHTML = "<option value='' disabled>Nenhum produto cadastrado</option>";
      produtoSelect.disabled = true;
    } else {
      produtos.forEach((produto) => {
        const option = document.createElement("option");
        option.value = produto.codigo;
        option.textContent = `${produto.descricao} (Código: ${produto.codigo})`;
        produtoSelect.appendChild(option);
      });
    }
  }

  estoqueForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(estoqueForm);
    const codigoProduto = formData.get("produto");
    const quantidadeEstoque = parseFloat(formData.get("quantidadeEstoque"));
    const dataCadastro = formData.get("dataCadastro");

    const produtos = getProdutos();
    const produto = produtos.find(p => p.codigo === codigoProduto);
    console.log(codigoProduto)
    console.log(produtos)
    console.log(produto)

    if (produto) {
      const estoque = getEstoque();
      const itemEstoque = {
        descricao: produto.descricao,
        codigo: produto.codigo,
        valor: produto.valor,
        dataCadastro: dataCadastro,
        quantidadeEstoque: quantidadeEstoque,
        quantidadeVendida: 0,
        status: produto.status
      };

      estoque.push(itemEstoque);
      saveEstoque(estoque);

      message.textContent = "Produto adicionado ao estoque com sucesso.";
      message.setAttribute("class", "success");

      setTimeout(() => {
        message.textContent = "";
        message.removeAttribute("class");
      }, 3000);

      estoqueForm.reset();
      renderEstoque();
    }
  });

  populateProdutoSelect();
  renderEstoque();
});
