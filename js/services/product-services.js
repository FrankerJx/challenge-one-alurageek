const urlServidor = "http://localhost:3000/Productos";
const urlEliminados = "http://localhost:3000/ProductosEliminados";

const productList = () => {
    return fetch(urlServidor)
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

const createProducts = (id, nombre, precio, imagen) => {
    return fetch(urlServidor, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: String(id),
            nombre,
            precio,
            imagen,
        }),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const deleteProduct = (id, nombre, precio, imagen) => {
    return fetch(urlEliminados, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            nombre,
            precio,
            imagen,
        }),
    })
        .then(() => {
            return fetch(`${urlServidor}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Error al eliminar el producto');
            }
        })
        .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
};