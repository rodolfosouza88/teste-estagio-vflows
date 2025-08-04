let anexos = [];

document.addEventListener("DOMContentLoaded", () => {
  const botaoIncluir = document.querySelector(".btn-success.mt-3");
  const inputAnexo = document.getElementById("inputAnexo");

  botaoIncluir.addEventListener("click", () => inputAnexo.click());

  inputAnexo.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        anexos.push({
          nomeArquivo: file.name,
          blobArquivo: e.target.result,
        });
        renderizarAnexos();
      };
      reader.readAsDataURL(file);
    });
  });

  renderizarAnexos();
});

function renderizarAnexos() {
  const lista = document.getElementById("lista-anexos");
  lista.innerHTML = "";

  if (anexos.length === 0) {
    lista.innerHTML = "<p>Nenhum documento anexado.</p>";
    return;
  }

  anexos.forEach((anexo, index) => {
    const row = document.createElement("div");
    row.className = "row align-items-center mt-2";

    // Criar os elementos dos botões para adicionar eventos diretamente
    const colRemove = document.createElement("div");
    colRemove.className = "col-md-1 d-flex justify-content-center";
    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.className = "btn btn-danger";
    btnRemove.title = `Remover ${anexo.nomeArquivo}`;
    btnRemove.innerHTML = `<img src="assets/img/trash-icon.png" alt="Excluir" width="30" />`;
    btnRemove.addEventListener("click", () => removerAnexo(index));
    colRemove.appendChild(btnRemove);

    const colView = document.createElement("div");
    colView.className = "col-md-1 d-flex justify-content-center";
    const btnView = document.createElement("button");
    btnView.type = "button";
    btnView.className = "btn btn-outline-secondary";
    btnView.title = `Visualizar ${anexo.nomeArquivo}`;
    btnView.innerHTML = `<img src="assets/img/eye.png" alt="Visualizar" width="30" />`;
    btnView.addEventListener("click", () => visualizarAnexo(index));
    colView.appendChild(btnView);

    const colName = document.createElement("div");
    colName.className = "col-md-10";
    const pName = document.createElement("p");
    pName.className = "mb-0";
    pName.textContent = anexo.nomeArquivo;
    colName.appendChild(pName);

    row.appendChild(colRemove);
    row.appendChild(colView);
    row.appendChild(colName);

    lista.appendChild(row);
  });
}

function removerAnexo(index) {
  anexos.splice(index, 1);
  renderizarAnexos();
}

function visualizarAnexo(index) {
  const anexo = anexos[index];
  // Abrir o arquivo em nova aba (se for imagem/pdf ou base64)
  const novaJanela = window.open();
  if (!novaJanela) {
    alert("Por favor, permita pop-ups para visualizar o anexo.");
    return;
  }
  novaJanela.document.write(`
    <html>
      <head><title>${anexo.nomeArquivo}</title></head>
      <body style="margin:0">
        <iframe src="${anexo.blobArquivo}" frameborder="0" style="border:none; width:100vw; height:100vh;"></iframe>
      </body>
    </html>
  `);
  novaJanela.document.close();
}
