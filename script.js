let carrinho = [];

// Adicionar produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome: nome, preco: preco, quantidade: 1 });
    }

    atualizarCarrinho();
    alert(`${nome} foi adicionado ao seu carrinho!`);
}

// Atualizar interface e contador
function atualizarCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').innerText = totalItens;

    const cartItemsContainer = document.getElementById('cart-items');
    let totalValor = 0;

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            totalValor += subtotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.nome}</strong><br>
                        <small>${item.quantidade}x R$ ${item.preco.toFixed(2)}</small>
                    </div>
                    <div>
                        <strong>R$ ${subtotal.toFixed(2)}</strong>
                        <button onclick="removerItem(${index})" style="background:red; color:white; border:none; padding: 2px 6px; margin-left: 5px; cursor:pointer; border-radius:3px;">X</button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('cart-total').innerText = totalValor.toFixed(2).replace('.', ',');
}

// Remover Item
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Controlar Modal
function abrirCarrinho() {
    document.getElementById('cart-modal').style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Enviar Lista do Carrinho via WhatsApp
function enviarPedidoCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const numeroWhats = '5500000000000'; // Substitua pelo seu WhatsApp real
    let texto = `*Novo Pedido via Site - BBZ Materiais Elétricos*%0A%0A`;

    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        texto += `• ${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2)}%0A`;
    });

    texto += `%0A*Total Estimado:* R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/${numeroWhats}?text=${texto}`, '_blank');
}

// Busca de Produtos
function buscar() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const produtos = document.querySelectorAll('.product-card');

    produtos.forEach(produto => {
        const titulo = produto.querySelector('h3').innerText.toLowerCase();
        if (titulo.includes(termo)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

document.getElementById('searchInput')?.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') buscar();
});

// Formulário de Orçamento Completo
function enviarOrcamento(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value;

    const numeroWhats = '5500000000000'; // Substitua pelo seu WhatsApp real

    const texto = `*Solicitação de Orçamento - BBZ*%0A%0A` +
                  `*Nome:* ${nome}%0A` +
                  `*Telefone:* ${telefone}%0A` +
                  `*Tipo:* ${tipo}%0A%0A` +
                  `*Lista/Mensagem:*%0A${mensagem}`;

    window.open(`https://wa.me/${numeroWhats}?text=${texto}`, '_blank');
}

// Filtrar Produtos por Categoria
function filtrarCategoria(categoria) {
    const produtos = document.querySelectorAll('.catalog-content .product-card');
    const botoes = document.querySelectorAll('.category-btn');

    // Atualizar estilo do botão ativo
    botoes.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Mostrar/ocultar produtos de acordo com a categoria selecionada
    produtos.forEach(produto => {
        const catProduto = produto.getAttribute('data-category');
        if (categoria === 'todas' || catProduto === categoria) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

// Busca rápida dentro da tela do Catálogo
function buscarNoCatalogo() {
    const termo = document.getElementById('catalogSearch').value.toLowerCase();
    const produtos = document.querySelectorAll('.catalog-content .product-card');

    produtos.forEach(produto => {
        const titulo = produto.querySelector('h3').innerText.toLowerCase();
        if (titulo.includes(termo)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}