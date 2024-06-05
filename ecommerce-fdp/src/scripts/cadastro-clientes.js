document.getElementById('clienteForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach((value, key) => {
      data[key] = value;
  });

  // Obter dados do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

  // Verificar se já existe um cliente com o mesmo CPF
  const clienteExistente = clientes.find(cliente => cliente.cpf === data.cpf);
  const message = document.getElementById("message");
  
  if (clienteExistente) {
      message.textContent = "Já existe um cliente cadastrado com o CPF informado.";
      message.setAttribute("class", "error");
  } else {
      clientes.push(data);
      localStorage.setItem('clientes', JSON.stringify(clientes));
      
      message.textContent = "Cliente cadastrado com sucesso.";
      message.setAttribute("class", "success");

      setTimeout(() => {
        message.textContent = "";
        message.removeAttribute("class");
      }, 3000);

      form.reset();
  }
});
