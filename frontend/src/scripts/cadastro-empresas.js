document
  .getElementById("empresaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Obter dados do localStorage
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    // Verificar se já existe uma empresa com o mesmo CNPJ
    const empresaExistente = empresas.find(
      (empresa) => empresa.cnpj === data.cnpj
    );
    const message = document.getElementById("message");

    if (empresaExistente) {
      message.textContent =
        "Já existe uma empresa cadastrada com o CNPJ informado.";
      message.setAttribute("class", "error");
    } else {
      empresas.push(data);
      localStorage.setItem("empresas", JSON.stringify(empresas));

      message.textContent = "Empresa cadastrada com sucesso.";
      message.setAttribute("class", "success");

      setTimeout(() => {
        message.textContent = "";
        message.removeAttribute("class");
      }, 3000);
      form.reset();
    }
  });
