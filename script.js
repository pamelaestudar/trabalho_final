// Inicialização do PouchDB
const db = new PouchDB('cart');

// Função para abrir o modal com os detalhes do produto
function openModal(product) {
    const modal = document.getElementById("productModal");
    modal.style.display = "block";

    // Atualizar o conteúdo do modal com os detalhes do produto
    document.querySelector(".modal-image").src = product.image;
    document.querySelector(".modal-title").innerText = product.title;
    document.querySelector(".modal-description").innerText = product.description;
    document.querySelector(".modal-price").innerText = product.price;
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
}

// Adicionar event listeners aos botões de "Ver detalhes"
document.querySelectorAll(".view-details").forEach((button, index) => {
    button.addEventListener("click", () => {
        const productItems = document.querySelectorAll(".product-item");
        const product = {
            image: productItems[index].querySelector("img").src,
            title: productItems[index].querySelector("h2").innerText,
            description: productItems[index].querySelector("p").innerText,
            price: productItems[index].querySelector(".price").innerText
        };
        openModal(product);
    });
});

// Adicionar event listeners aos botões de "Adicionar ao carrinho"
document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", async () => {
        const productItems = document.querySelectorAll(".product-item");
        const product = {
            _id: new Date().toISOString(),
            image: productItems[index].querySelector("img").src,
            title: productItems[index].querySelector("h2").innerText,
            description: productItems[index].querySelector("p").innerText,
            price: productItems[index].querySelector(".price").innerText
        };
        await db.put(product);
        alert("Produto adicionado ao carrinho!");
    });
});

// Adicionar event listener ao botão de "Adicionar ao carrinho" no modal
document.querySelector(".add-to-cart-modal").addEventListener("click", async () => {
    const product = {
        _id: new Date().toISOString(),
        image: document.querySelector(".modal-image").src,
        title: document.querySelector(".modal-title").innerText,
        description: document.querySelector(".modal-description").innerText,
        price: document.querySelector(".modal-price").innerText
    };
    await db.put(product);
    alert("Produto adicionado ao carrinho!");
    closeModal();
});
