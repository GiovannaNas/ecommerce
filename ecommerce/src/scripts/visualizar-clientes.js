document.addEventListener("DOMContentLoaded", () => {
  const clientesContainer = document.getElementById("clientesContainer");

  function getClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
  }

  function renderClientes() {
    const clientes = getClientes();

    clientesContainer.innerHTML = "";

    if (clientes.length === 0) {
      clientesContainer.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
      return;
    }

    clientes.forEach((cliente) => {
      const clientDiv = document.createElement("div");
      clientDiv.classList.add("item-list");

      const clientDetails = document.createElement("div");
      clientDetails.classList.add("item-details");

      clientDetails.innerHTML = `
        <p><strong>Nome:</strong> ${cliente.nome}</p>
        <p><strong>CPF:</strong> ${cliente.cpf}</p>
        <p><strong>Data de Nascimento:</strong> ${cliente.dataNascimento}</p>
        <p><strong>Data de Cadastro:</strong> ${cliente.dataCadastro}</p>
        <p><strong>E-mail:</strong> ${cliente.email}</p>
        <p><strong>Telefone:</strong> ${cliente.telefone}</p>
        <p><strong>Celular:</strong> ${cliente.celular}</p>
        <p><strong>Endereço:</strong> ${cliente.endereco}</p>
      `;

      clientDiv.appendChild(clientDetails);
      clientesContainer.appendChild(clientDiv);
    });
  }

  renderClientes();
});
