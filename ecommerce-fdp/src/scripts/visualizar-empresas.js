document.addEventListener("DOMContentLoaded", () => {
  const empresasContainer = document.getElementById("empresasContainer");

  function getEmpresas() {
    return JSON.parse(localStorage.getItem("empresas")) || [];
  }

  function renderEmpresas() {
    const empresas = getEmpresas();

    empresasContainer.innerHTML = "";

    if (empresas.length === 0) {
      empresasContainer.innerHTML = "<p>Nenhuma empresa cadastrada.</p>";
      return;
    }

    empresas.forEach((empresa) => {
      const empresaDiv = document.createElement("div");
      empresaDiv.classList.add("item-list");

      const empresaDetails = document.createElement("div");
      empresaDetails.classList.add("item-details");

      empresaDetails.innerHTML = `
        <p><strong>Razão Social:</strong> ${empresa.razaoSocial}</p>
        <p><strong>Nome Fantasia:</strong> ${empresa.nomeFantasia}</p>
        <p><strong>CNPJ:</strong> ${empresa.cnpj}</p>
        <p><strong>Data de Cadastro:</strong> ${empresa.dataCadastro}</p>
        <p><strong>E-mail:</strong> ${empresa.email}</p>
        <p><strong>Telefone:</strong> ${empresa.telefone}</p>
        <p><strong>Celular:</strong> ${empresa.celular}</p>
        <p><strong>Contato:</strong> ${empresa.contato}</p>
        <p><strong>Endereço:</strong> ${empresa.endereco}</p>
      `;

      empresaDiv.appendChild(empresaDetails);
      empresasContainer.appendChild(empresaDiv);
    });
  }

  renderEmpresas();
});
