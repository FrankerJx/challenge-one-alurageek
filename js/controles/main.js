import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(nombre, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img__container">
            <img src="${imagen}" alt="${nombre}">
        </div>

        <div class="card-container--info">
            <p>${nombre}</p>
            <div class="card-container--value">
                <p>$ ${precio}</p>
                <button class="trash-button" data-id="${id}" data-name="${nombre}" data-price="${precio}" data-img="${imagen}">
                    <img class="trash-icon" src="img/trashIcon.png">
                </button>
            </div>
        </div>
`;
    productContainer.appendChild(card);

    const trashButton = card.querySelector(".trash-button");
    trashButton.addEventListener("click", (event) => {
        event.preventDefault();
        const idProducto = trashButton.getAttribute("data-id");
        const nombreProducto = trashButton.getAttribute("data-name");
        const precioProducto = trashButton.getAttribute("data-price");
        const imagenProducto = trashButton.getAttribute("data-img");

        servicesProducts.deleteProduct(idProducto, nombreProducto, precioProducto, imagenProducto)
            .then(() => {
                // alert('Producto eliminado exitosamente');
                card.remove();
            })
            .catch((err) => console.log(err));
    });

    return card;

}


const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        // console.log(listProducts);
        if (listProducts.length === 0) {
            const msjError = document.createElement("h1");
            msjError.textContent = "No se han agregado productos.";
            productContainer.appendChild(msjError);
        } else {
            listProducts.forEach(product => {
                productContainer.appendChild(
                    createCard(
                        product.nombre,
                        product.precio,
                        product.imagen,
                        product.id
                    )
                )
            });
        }

    } catch (error) {
        console.log(error);
    }
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    const listProducts = await servicesProducts.productList();
    const maxId = listProducts.length > 0 ? Math.max(...listProducts.map(product => parseInt(product.id))) : 0;
    const nuevoId = maxId + 1;

    servicesProducts.createProducts(nuevoId, nombre, precio, imagen)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))

})

render();