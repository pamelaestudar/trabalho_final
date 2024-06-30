// Inicialização do PouchDB
const db = new PouchDB('cart');

// Função para carregar os itens do carrinho
async function loadCartItems() {
    const result = await db.allDocs({ include_docs: true });
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    result.rows.forEach(row => {
        const product = row.doc;
        const item = document.createElement('div');
        item.classList.add('cart-item');
        
        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span class="price">${product.price}</span>
                <button class="remove-from-cart" data-id="${product._id}">Remover</button>
            </div>
        `;

        cartItemsContainer.appendChild(item);
    });

    // Adicionar event listener aos botões de "Remover"
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.getAttribute('data-id');
            await db.remove(await db.get(id));
            loadCartItems();
        });
    });
}

// Carregar os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', loadCartItems);
