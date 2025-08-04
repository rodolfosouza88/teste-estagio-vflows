document.addEventListener("DOMContentLoaded", () => {
  aplicarMascaras();
  configurarBuscaCep();
});

function aplicarMascaras() {
  const cnpjInput = document.getElementById("cnpj");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  cnpjInput.addEventListener("input", () => {
    cnpjInput.value = cnpjInput.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  });

  telefoneInput.addEventListener("input", () => {
    telefoneInput.value = telefoneInput.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 16);
  });

  cepInput.addEventListener("input", () => {
    cepInput.value = cepInput.value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  });
}

function configurarBuscaCep() {
  const cepInput = document.getElementById("cep");
  cepInput.addEventListener("blur", () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) return;
        document.getElementById("endereco").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("municipio").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";
      })
      .catch(console.error);
  });
}

document
  .querySelector(".btn-success.w-75.m-3")
  .addEventListener("click", () => {
    const form = document.getElementById("form-fornecedor");
    if (!form.checkValidity()) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (anexos.length === 0) {
      alert("Inclua pelo menos 1 anexo!");
      return;
    }

    const dados = {
      razaoSocial: form.razaosocial.value,
      nomeFantasia: form.nomefantasia.value,
      cnpj: form.cnpj.value,
      inscricaoEstadual: form.ie.value,
      inscricaoMunicipal: form.inscricaoMunicipal.value,
      nomeContato: form.pessoaContato.value,
      telefoneContato: form.telefone.value,
      emailContato: form.email.value,
      produtos: [
        {
          indice: 1,
          descricaoProduto: document.getElementById("nomeProduto1").value,
          unidadeMedida: document.getElementById("undMedida1").value,
          qtdeEstoque: document.getElementById("qtdEstoque1").value,
          valorUnitario: document.getElementById("valorUnitario1").value,
          valorTotal: document.getElementById("valorTotal1").value,
        },
        {
          indice: 2,
          descricaoProduto: document.getElementById("nomeProduto2").value,
          unidadeMedida: document.getElementById("undMedida2").value,
          qtdeEstoque: document.getElementById("qtdEstoque2").value,
          valorUnitario: document.getElementById("valorUnitario2").value,
          valorTotal: document.getElementById("valorTotal2").value,
        },
      ],
      anexos: anexos.map((a, i) => ({
        indice: i + 1,
        nomeArquivo: a.nomeArquivo,
        blobArquivo: a.blobArquivo,
      })),
    };

    console.log("JSON Final:", JSON.stringify(dados, null, 2));
    alert("Dados gerados no console!");
  });
