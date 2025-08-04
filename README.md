# Desafio Front-End VFlows – Cadastro de Fornecedor e Produtos

## Sobre o desafio

Este projeto foi desenvolvido para o processo seletivo de estágio da VFlows.  
O objetivo do desafio é criar um formulário para cadastro de fornecedores e produtos seguindo um layout pré-definido, utilizando apenas HTML5, CSS, Bootstrap e JavaScript (ECMAScript 6).

---

## Requisitos atendidos

- **HTML5**: Estrutura semântica conforme padrões.
- **CSS e Bootstrap 5**: Para estilização e responsividade.
- **JavaScript (ES6)**: Aplicação da lógica, máscaras, eventos e manipulação do DOM.
- **jQuery 3.5.1**: Usado para manipulação simples e compatibilidade.
- **Formulário com validação**:
  - Campos obrigatórios: Razão Social, Nome Fantasia, CNPJ, Endereço (preenchido via API ViaCEP), Pessoa de Contato, Telefone, E-mail.
  - Campos opcionais: Inscrição Estadual e Inscrição Municipal.
- **Tabela de produtos dinâmica**:
  - Inclusão obrigatória de pelo menos 1 produto.
  - Cálculo automático do valor total (quantidade x valor unitário).
- **Tabela de anexos**:
  - Inclusão obrigatória de pelo menos 1 anexo.
  - Armazenamento dos arquivos em memória usando Blob e sessionStorage.
  - Botão excluir remove o anexo da memória e da interface.
  - Botão visualizar permite download do documento.
- **Geração do JSON final**:
  - JSON com dados do fornecedor, produtos e anexos é exibido no console ao salvar.
- **Modal de loading** na submissão (implementação simples para feedback).

---

## Tecnologias utilizadas

- HTML5
- CSS3 com Bootstrap 5
- JavaScript (ES6)
- jQuery 3.5.1
- API ViaCEP para busca automática do endereço pelo CEP
- sessionStorage para armazenamento temporário dos anexos

---

## Como executar

1. Clone este repositório:
   ```bash
   git clone <URL-do-repositório>
   ```
