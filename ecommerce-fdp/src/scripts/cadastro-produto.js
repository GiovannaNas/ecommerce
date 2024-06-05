document.getElementById('produtoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach((value, key) => {
      data[key] = value;
  });

  // Obter dados do localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  // Verificar se já existe um produto com o mesmo código
  const produtoExistente = produtos.find(produto => produto.codigo === data.codigo);
  const message = document.getElementById("message");
  
  if (produtoExistente) {
      message.textContent = "Já existe um produto cadastrado com o código informado.";
      message.setAttribute("class", "error");
  } else {
      produtos.push(data);
      localStorage.setItem('produtos', JSON.stringify(produtos));

      message.textContent = "Produto cadastrado com sucesso.";
      message.setAttribute("class", "success");

      setTimeout(() => {
        message.textContent = "";
        message.removeAttribute("class");
      }, 3000);
      form.reset();
  }
});
