// script.js
class Item {
    constructor(titulo, autor, tipo, ano, quantidade) {
        this.titulo = titulo;
        this.autor = autor;
        this.tipo = tipo;
        this.ano = ano;
        this.quantidade = quantidade;
        this.disponivel = quantidade; // Inicialmente, a quantidade disponível é igual à total
    }
}

const itens = [];

document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    const tipoItem = document.getElementById('tipo-item').value;
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano').value;
    const quantidade = parseInt(document.getElementById('quantidade').value, 10);

    const novoItem = new Item(titulo, autor, tipoItem, ano, quantidade);
    itens.push(novoItem);
    adicionarItemTabela(novoItem);
    
    // Limpar o formulário após a adição
    document.getElementById('item-form').reset();
});

function adicionarItemTabela(item) {
    const tabelaBody = document.querySelector('#tabela-itens tbody');
    const novaLinha = document.createElement('tr');
    novaLinha.classList.add(item.tipo); // Adiciona a classe com base no tipo

    novaLinha.innerHTML = `
        <td>${item.titulo}</td>
        <td>${item.autor}</td>
        <td>${item.tipo}</td>
        <td>${item.ano}</td>
        <td>${item.quantidade}</td>
        <td><button onclick="removerItem(this)">Remover</button></td>
    `;

    tabelaBody.appendChild(novaLinha);
}

function removerItem(botao) {
    const linha = botao.parentElement.parentElement; // Obtém a linha da tabela
    linha.remove(); // Remove a linha da tabela
}
