//Variáveis do Usuário.
let nome = document.querySelector('input#nomeUsuario');
let tipo = document.querySelector('select#tipoUsuario');
let listaUsuarios = document.querySelector('select#listaUsuario');
let res = document.querySelector('div#res');
let usuarios = [];

// Função para adicionar um usuário.
function adicionarUsuario() {
    //Verifica se o nome do usuário é válido.
    if (!/^[a-zA-Z\s]{3,50}$/.test(nome.value.trim())) {
        alert('Por favor, insira um nome de usuário.');
        nome.focus();
        return;
    }

    //Verifica se o nome já existe na lista de Usuários.
    let usuarioExistente = usuarios.some(user => user.nome.toLowerCase() === nome.value.trim().toLowerCase())
    
    if(usuarioExistente){
        alert('Esse nome de usuário já foi cadastrado.');
        nome.focus();
        return;
    }

    //Tratamento de créditos respectivamente de cada usuário. 
    let cred = 0;
    if(tipo.value === 'Aluno'){
        cred = 3;
    } else if(tipo.value === 'Professor'){
        cred = 5 ;
    } else cred = 0;

    //Vetor com dados do usuário.
    let usuario = {
        nome: nome.value.trim(),
        tipo: tipo.value,
        credito: cred,
        emprestimos: {}
    }

    //Adiciona o vetor usuario no vetor usuários.
    usuarios.push(usuario);

    //Atualiza a interface para adição de usuários.
    atualizarUsuarios();
    alert(`Usuário ${usuario.nome} adicionado com sucesso.`);
    res.innerHTML = `<br>Usuário <strong>${usuario.nome}</strong> do tipo <strong>${usuario.tipo}</strong> foi adicionado com sucesso!`;
    nome.value = '';
    nome.focus();
}
//Função para remover o usuário.
function removerUsuario() {
    let usuarioSelecionado = listaUsuarios.selectedIndex;
    
    //Verifica se o usuário está selecionado.
    if (usuarioSelecionado === -1) {
        alert('Selecione um usuário para remover.');
        return;
    }

    // Remove e retorna o usuário
    let usuarioRemovido = usuarios.splice(usuarioSelecionado, 1)[0]; 

    alert(`Usuário ${usuarioRemovido.nome} removido com sucesso.`);
    res.innerHTML = `<br>Usuário ${usuarioRemovido.nome} do tipo ${usuarioRemovido.tipo} removido com sucesso.`;

    //Informa caso a lista de usuários esteja vazia.
    if(usuarios.length === 0){
        alert("Nenhum usuário restante.");
    }

    //Atualiza a interface após remover usuário.
    atualizarUsuarios();
}

//Função para atualizar lista de usuários após alguma alteração.
function atualizarUsuarios(){
    listaUsuarios.innerHTML = '';

    //Cria a lista de usuários atualizada.
    for(let i = 0; i < usuarios.length; i++){
        let usuario = usuarios[i];
        let nomelista = document.createElement('option');
        nomelista.text = `Usuário ${usuario.nome} - Tipo ${usuario.tipo}`;
        nomelista.value = i;
        listaUsuarios.appendChild(nomelista);
    }
}

//Variáveis para item.
let tipoItem = document.querySelector('select#tipoItem');
let titulo = document.querySelector('input#titulo');
let autor = document.querySelector('input#autor');
let ano = document.querySelector('input#ano');
let quantidade = document.querySelector('input#quantidade');
let listaItens = document.querySelector('select#listaItem');
let resItem = document.querySelector('div#resItem');
let itens = [];


// Função para adicionar um item.
function adicionarItem() {
    //Verifica se o item cadastrado possui título valido.
    if (!/^[a-zA-Z0-9\s]{3,50}$/.test(titulo.value.trim())) {
        alert('Por favor, insira um título válido.');
        titulo.focus();
        return;
    }

    //Verifica se o item já existe na lista de itens.
    let itemExistente = itens.some(it => it.titulo.toLowerCase() === titulo.value.trim().toLowerCase())

    if(itemExistente){
        alert('Esse item já foi cadastrado.');
        titulo.focus();
        return;
    }

    //Verifica se o autor está preenchido.
    if(!autor.value.trim()){
        alert('Por favor, insira o nome do autor.')
        autor.focus();
        return;
    }

    //Verifica se o ano é válido. 
    let anoAtual = new Date();
    if(Number(ano.value) > anoAtual.getFullYear() || Number(ano.value) < 1500){
        alert('Ano inválido! Insira um ano entre 1500 e o ano atual.')
        return;
    } else
    //Verifica se a quantidade está válida.
    if(Number(quantidade.value) < 0 || !(Number.isInteger(Number(quantidade.value)))){
        alert('Digite um quantidade maior que 0 e/ou de valor inteiro.')
        return;
    }

    //Cria o vetor item.
    let item = {
        tipo: tipoItem.value,
        titulo: titulo.value,
        autor: autor.value,
        ano: Number(ano.value),
        quantidade: Number(quantidade.value),
        quantidadeMaxima: Number(quantidade.value)
    }

    //Adiciona o item ao vetor itens.
    itens.push(item);

    //Atualiza a tabela de itens após adição de itens.
    atualizarListaItens();
    alert('Item adicionado com sucesso!');
    resItem.innerHTML = `<br>Item ${item.titulo} adicionado com sucesso.`;
    // Limpa o Formulário de itens após adição.
    limparFormularioItem();
}



//Função para remover um item.
function removerItem() {
    //Seleciona o item da lista de Itens.
    let itemSelecionado = listaItens.selectedIndex;

    //Verifica se o item está selecionado.
    if (itemSelecionado === -1) {
        alert('Selecione um item para remover.');
        return;
    }

    //Remove e retorna o item.
    let itemRemovido = itens.splice(itemSelecionado, 1)[0];
    
    //Atualizar a interface após a remoção de itens.
    atualizarListaItens();
    alert(`Item ${itemRemovido.titulo} removido com sucesso.`);
    resItem.innerHTML = `<br>Item ${itemRemovido.titulo} removido com sucesso.`;
}

//Função para atualizar a lista de itens.
function atualizarListaItens(){
    listaItens.innerHTML = '';

    //Enumera os itens da lista.
    for(let i = 0; i < itens.length; i++) {
        let item = itens[i];
        let itemLista = document.createElement('option');
        itemLista.text = `Item ${item.titulo} - ${item.tipo}, Autor: ${item.autor}, Ano: ${item.ano}, Disponíveis: ${item.quantidade}`;
        itemLista.value = i;

        //Criando os itens com as respectivas cores.
        if(item.tipo === 'Livro'){
            itemLista.style.color = 'green';
        } else if (item.tipo === 'Revista'){
            itemLista.style.color = "blue";
        } else if (item.tipo === 'DVD'){
            itemLista.style.color = "purple";
        }

        listaItens.appendChild(itemLista);
    }

    //Verifica se há item cadastrado.
    if(itens.length === 0){
        resItem.innerHTML = '<br>Nenhum item cadastrado.';
    } else resItem.innerHTML = '';
}

//Função para limpar formulários ao adicionar item.
function limparFormularioItem(){
    tipoItem.selectedIndex = 0;
    titulo.value = '';
    autor.value = '';
    ano.value = '';
    quantidade.value = '';
    titulo.focus();
}

// Função para registrar empréstimo.
function emprestimo() {
    let usuarioSelecionado = listaUsuarios.selectedIndex;
    let itemSelecionado = listaItens.selectedIndex;

    //Verifica se Usuário e Item estão selecionados.
    if (usuarioSelecionado === -1 || itemSelecionado === -1) {
        alert('Selecione um usuário e um item para empréstimo.');
        return;
    }

    //Recebe os itens selecionados.
    let usuario = usuarios[usuarioSelecionado];
    let item = itens[itemSelecionado];

    //Verifica a disponibilidade para empréstimo.
    if (item.quantidade <= 0) {
        alert(`O item ${item.titulo} está indisponível para empréstimo.`);
        return;
    }

    //Verifica se o usuário possui crédito para empréstimo.
    if (usuario.credito <= 0) {
        alert(`O usuário ${usuario.nome} não possui mais créditos.`);
        return;
    }

    //Define o prazo de devolução com base no tipo de usuário.
    let dataEmprestimo = new Date();
    let dataDevolucaoEsperada = new Date();
    let prazoDias = 0;
    if(usuario.tipo === 'Aluno'){
        prazoDias = 15;
    } else if (usuario.tipo === 'Professor'){
        prazoDias = 30;
    } else prazoDias = 0;

    dataDevolucaoEsperada.setDate(dataEmprestimo.getDate() + prazoDias);

    //Registra o empréstimo.
    usuario.emprestimos[item.titulo] = (usuario.emprestimos[item.titulo] || 0) + 1;
    item.dataEmprestimo = dataEmprestimo;
    item.dataDevolucaoEsperada = dataDevolucaoEsperada;//Armazena a data prevista de devolução.

    //Atualiza os dados
    item.quantidade--;
    usuario.credito--;

    //Atualizar a interface após empréstimos.
    atualizarListaItens();
    alert(`Empréstimo realizado!
    Devolução até ${dataDevolucaoEsperada.toLocaleDateString('pt-BR')}.`
    );

    resItem.innerHTML = `<br>Empréstimo realizado!
        <br>Devolução até ${dataDevolucaoEsperada.toLocaleDateString('pt-BR')}
        <br> ${usuario.nome} possui ${usuario.credito} empréstimos disponíveis.
        <br> Quantidade restante de ${item.titulo}: ${item.quantidade}.`;
}


// Função para registrar devolução.
function devolucao() {
    let usuarioSelecionado = listaUsuarios.selectedIndex;
    let itemSelecionado = listaItens.selectedIndex;

    //Verifica se Usuário e Item estão selecionados.
    if (usuarioSelecionado === -1 || itemSelecionado === -1) {
        alert('Selecione um usuário e um item para devolução.');
        return;
    }

    //Variáveis recebem os itens selecionados.
    let usuario = usuarios[usuarioSelecionado];
    let item = itens[itemSelecionado];

    //Verifica se o usuário possui empréstimos do item em questão.
    if(!usuario.emprestimos[item.titulo] || usuario.emprestimos[item.titulo] <= 0){
        alert(`O usuário ${usuario.nome} não possui empréstimos do item ${item.titulo}.`);
        return;
    }

    //Verifica se a quantidade do item já está no máximo após devolução. 
    if(item.quantidade >= item.quantidadeMaxima){
        alert(`A quantidade de ${item.titulo} já está no máximo.`);
        return;
    }

    //Calcula a data de devolução prevista.
    let hoje = new Date();
    let dataDevolucaoEsperada = new Date(item.dataDevolucaoEsperada);

    //Cálculo da multa se houver atraso, Math.ceil arredonda o número para acima e inteiro.
    let diasAtraso = Math.ceil((hoje - dataDevolucaoEsperada) / (1000 * 60 * 60 * 24));
    let multa = 0;
    if(diasAtraso > 0){
        multa = diasAtraso * 2; //Multa de dois reais ao dia.
        alert(`Devolução atrasada por ${diasAtraso} dias.<br>O usuário ${usuario.nome} deve pagar uma multa de ${multa} pelos dias de atraso.`);
    } else alert(`O usuário ${usuario.nome} devolveu o item no prazo, não tem multas a pagar.`);

    //Atualiza os dados.
    item.quantidade++;
    usuario.credito++;
    usuario.emprestimos[item.titulo]--;

    //Atualiza a interface após devoluções.
    atualizarListaItens();
    alert(`Devolução realizada com sucesso!
    Obrigado por devolver o item "${item.titulo}"!`);
    resItem.innerHTML = `<br>Devolução realizada!
        <br> ${usuario.nome} possui ${usuario.credito} empréstimos disponíveis.
        <br> Quantidade disponível de ${item.titulo}: ${item.quantidade}.`;
}