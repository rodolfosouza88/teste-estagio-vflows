document.addEventListener("DOMContentLoaded", () => {
  // Configura produtos existentes inicialmente
  document.querySelectorAll(".produto-item").forEach((item, index) => {
    configurarProduto(item, index + 1);
    item.querySelector(".btn-remover-produto").addEventListener("click", () => {
      item.remove();
      atualizarIndices();
    });
  });

  // Botão para adicionar novo produto
  document
    .getElementById("addProduct")
    .addEventListener("click", adicionarProduto);
});

function configurarProduto(container, index) {
  const qtdInput = container.querySelector(`#qtdEstoque${index}`);
  const unitInput = container.querySelector(`#valorUnitario${index}`);
  const totalInput = container.querySelector(`#valorTotal${index}`);

  function atualizarTotal() {
    const qtd = parseFloat(qtdInput.value || 0);
    const valor = parseFloat(unitInput.value || 0);
    totalInput.value = (qtd * valor).toFixed(2);
  }

  qtdInput.addEventListener("input", atualizarTotal);
  unitInput.addEventListener("input", atualizarTotal);
}

function adicionarProduto() {
  const lista = document.getElementById("lista-produtos");
  const produtosAtuais = document.querySelectorAll(".produto-item").length;
  const novoIndex = produtosAtuais + 1;

  const novoProdutoHTML = `
    <div class="row g-3 align-items-center p-3 rounded-bottom produto-item" id="produto-${novoIndex}">
      <div class="col-md-1 d-flex justify-content-center">
        <button type="button" class="btn btn-danger mt-2 btn-remover-produto" aria-label="Deletar Produto ${novoIndex}">
          <img src="assets/img/trash-icon.png" alt="Remover produto" width="40" />
        </button>
      </div>
      <div class="col-md-11">
        <div class="product-card border rounded-3 p-3">
          <h5>Produto - ${novoIndex}</h5>
          <div class="row">
            <div class="col-md-2 d-flex align-items-center">
              <img src="assets/img/caixa.png" alt="Produto" class="img-fluid" style="max-height: 100px" />
            </div>
            <div class="col-md-10">
              <div class="mb-3">
                <label for="nomeProduto${novoIndex}" class="form-label">Produto</label>
                <input type="text" class="form-control" id="nomeProduto${novoIndex}" name="nomeProduto${novoIndex}" required />
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="undMedida${novoIndex}" class="form-label">UND. Medida</label>
                  <select class="form-select text-secondary" id="undMedida${novoIndex}" name="undMedida${novoIndex}" required>
                    <option value="">Selecione</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="un">un</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="qtdEstoque${novoIndex}" class="form-label">QTD. em Estoque</label>
                  <input type="number" class="form-control" id="qtdEstoque${novoIndex}" name="qtdEstoque${novoIndex}" required />
                </div>
                <div class="col-md-3 mb-3">
                  <label for="valorUnitario${novoIndex}" class="form-label">Valor Unitário</label>
                  <input type="number" class="form-control" id="valorUnitario${novoIndex}" name="valorUnitario${novoIndex}" step="0.01" required />
                </div>
                <div class="col-md-3 mb-3">
                  <label for="valorTotal${novoIndex}" class="form-label">Valor Total</label>
                  <input type="number" class="form-control" id="valorTotal${novoIndex}" name="valorTotal${novoIndex}" step="0.01" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  lista.insertAdjacentHTML("beforeend", novoProdutoHTML);

  const novoProduto = document.getElementById(`produto-${novoIndex}`);

  configurarProduto(novoProduto, novoIndex);

  novoProduto
    .querySelector(".btn-remover-produto")
    .addEventListener("click", () => {
      novoProduto.remove();
      atualizarIndices();
    });
}

function atualizarIndices() {
  const produtos = document.querySelectorAll(".produto-item");
  produtos.forEach((produto, i) => {
    const novoIndex = i + 1;
    produto.id = `produto-${novoIndex}`;
    produto.querySelector("h5").textContent = `Produto - ${novoIndex}`;

    // Atualizar atributos dos inputs e labels
    produto
      .querySelector("label[for^='nomeProduto']")
      .setAttribute("for", `nomeProduto${novoIndex}`);
    produto.querySelector(
      "input[id^='nomeProduto']"
    ).id = `nomeProduto${novoIndex}`;
    produto.querySelector(
      "input[name^='nomeProduto']"
    ).name = `nomeProduto${novoIndex}`;

    produto
      .querySelector("label[for^='undMedida']")
      .setAttribute("for", `undMedida${novoIndex}`);
    produto.querySelector(
      "select[id^='undMedida']"
    ).id = `undMedida${novoIndex}`;
    produto.querySelector(
      "select[name^='undMedida']"
    ).name = `undMedida${novoIndex}`;

    produto
      .querySelector("label[for^='qtdEstoque']")
      .setAttribute("for", `qtdEstoque${novoIndex}`);
    produto.querySelector(
      "input[id^='qtdEstoque']"
    ).id = `qtdEstoque${novoIndex}`;
    produto.querySelector(
      "input[name^='qtdEstoque']"
    ).name = `qtdEstoque${novoIndex}`;

    produto
      .querySelector("label[for^='valorUnitario']")
      .setAttribute("for", `valorUnitario${novoIndex}`);
    produto.querySelector(
      "input[id^='valorUnitario']"
    ).id = `valorUnitario${novoIndex}`;
    produto.querySelector(
      "input[name^='valorUnitario']"
    ).name = `valorUnitario${novoIndex}`;

    produto
      .querySelector("label[for^='valorTotal']")
      .setAttribute("for", `valorTotal${novoIndex}`);
    produto.querySelector(
      "input[id^='valorTotal']"
    ).id = `valorTotal${novoIndex}`;
    produto.querySelector(
      "input[name^='valorTotal']"
    ).name = `valorTotal${novoIndex}`;

    // Remover antigos event listeners para evitar múltiplos
    produto.querySelector(`#qtdEstoque${novoIndex}`).oninput = null;
    produto.querySelector(`#valorUnitario${novoIndex}`).oninput = null;

    // Reconfigurar cálculo total
    configurarProduto(produto, novoIndex);

    // Atualizar o evento de remoção do botão
    const btnRemover = produto.querySelector(".btn-remover-produto");
    btnRemover.onclick = () => {
      produto.remove();
      atualizarIndices();
    };
  });
}
