/*Barra de pesquisa*/

function pesquisa() {
    let input = document.getElementById('lupa').value.toLowerCase();
    let videogames = document.getElementsByClassName('item');

    for (let i = 0; i < videogames.length; i++) {
        if (!videogames[i].innerHTML.toLowerCase().includes(input)) {
            videogames[i].style.display = 'none';
        } else {
            videogames[i].style.display = 'block';
        }
    }
}

/*pesquisa por categoria*/

document.querySelectorAll('.itens-menu a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const category = this.getAttribute('data-category');
        filtrarItens(category);
    });
});

function filtrarItens(categoria) {
    const itens = document.querySelectorAll('.item');
    itens.forEach(item => {
        if (item.classList.contains(categoria)) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none';
        }
    });
}

// Arrays para armazenar os itens do carrinho e favoritos
let carrinho = [];
let favoritos = [];

// Selecionar elementos do carrinho
const carrinhoElement = document.getElementById('carrinho');
const itensCarrinhoElement = document.getElementById('itens-carrinho');
const totalPrecoElement = document.getElementById('total-preco');
const finalizarCompraButton = document.getElementById('finalizar-compra');
const menuOpenner = document.querySelector('.menu-openner');

// Selecionar elementos dos favoritos
const favoritosElement = document.getElementById('favoritos');
const itensFavoritosElement = document.getElementById('itens-favoritos');
const limparFavoritosButton = document.getElementById('limpar-favoritos');
const favorOpenner = document.querySelector('.favor-openner');

// Função para atualizar a visualização do carrinho
function atualizarCarrinho() {
    itensCarrinhoElement.innerHTML = '';
    if (carrinho.length === 0) {
        itensCarrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item-carrinho');
            itemElement.innerHTML = `
                <p>${item.nome} - R$${item.preco.toFixed(2)}</p>
                <button id='remover' onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            itensCarrinhoElement.appendChild(itemElement);
        });
    }
    // Atualizar o total
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalPrecoElement.innerText = total.toFixed(2);
    // Atualizar o contador no menu
    document.querySelector('.menu-openner span').innerText = carrinho.length;
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Evento para abrir o carrinho
menuOpenner.addEventListener('click', (e) => {
    e.stopPropagation();
    carrinhoElement.style.display = 'block';
});

// Evento para finalizar a compra
finalizarCompraButton.addEventListener('click', () => {
    alert('Compra finalizada!');
    carrinho = [];
    atualizarCarrinho();
    carrinhoElement.style.display = 'none';
});

// Função para atualizar a visualização dos favoritos
function atualizarFavoritos() {
    itensFavoritosElement.innerHTML = '';
    if (favoritos.length === 0) {
        itensFavoritosElement.innerHTML = '<p>Você não possui favoritos.</p>';
    } else {
        favoritos.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item-favorito');
            itemElement.innerHTML = `
                <p>${item.nome} - R$${item.preco.toFixed(2)}</p>
                <button id='remover-favorito' onclick="removerFavorito(${index})">Remover</button>
            `;
            itensFavoritosElement.appendChild(itemElement);
        });
    }
    // Atualizar o contador no menu
    document.querySelector('.favor-openner span').innerText = favoritos.length;
}

// Função para adicionar um item aos favoritos
function adicionarFavorito(nome, preco) {
    favoritos.push({ nome, preco });
    atualizarFavoritos();
}

// Função para remover um item dos favoritos
function removerFavorito(index) {
    favoritos.splice(index, 1);
    atualizarFavoritos();
}

// Evento para limpar todos os favoritos
limparFavoritosButton.addEventListener('click', () => {
    favoritos = [];
    atualizarFavoritos();
});

// Evento para abrir os favoritos
favorOpenner.addEventListener('click', (e) => {
    e.stopPropagation();
    favoritosElement.style.display = 'block';
});

// Fechar os menus quando clicar fora
window.addEventListener('click', (e) => {
    if (!carrinhoElement.contains(e.target) && !menuOpenner.contains(e.target)) {
        carrinhoElement.style.display = 'none';
    }
    if (!favoritosElement.contains(e.target) && !favorOpenner.contains(e.target)) {
        favoritosElement.style.display = 'none';
    }
});

// Adicionar evento de clique aos botões de compra
document.querySelectorAll('.comprar').forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const nome = item.querySelector('h3').innerText;
        const preco = parseFloat(item.querySelector('span').innerText.replace('R$', '').replace(',', '.'));
        adicionarAoCarrinho(nome, preco);
    });
});

// Adicionar evento de clique aos botões de favoritos
document.querySelectorAll('.favoritos-openner').forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const nome = item.querySelector('h3').innerText;
        const preco = parseFloat(item.querySelector('span').innerText.replace('R$', '').replace(',', '.'));
        adicionarFavorito(nome, preco);
    });
});



/*Carrosel Principal*/
const imgs = document.getElementById("imagem");
const img = document.querySelectorAll("#imagem img");

let idx = 0;
let posicao = true;

function carrossel() {
    const larguraImagem = img[0].offsetWidth
    const larguraTotal = larguraImagem * img.length;
    const larguraCarrossel = imgs.offsetWidth;

    if (posicao) {
        idx++;
        if (idx >= img.length || larguraTotal <= larguraCarrossel) {
            idx = 0;
        }
    } else {
        idx--;
        if (idx < 0) {
            idx = img.length - 1;
        }
    }

    const deslocamento = -idx * larguraImagem;
    imgs.style.transform = `translateX(${deslocamento}px)`;
}

setInterval(carrossel, 3000);
window.addEventListener('resize', carrossel);
