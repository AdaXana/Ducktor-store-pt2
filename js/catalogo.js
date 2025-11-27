import { productos } from './productos.js';

const contenedor = document.getElementById("contenedor-productos");

const cardsProductos = productos.map((ducktor) => {
    let textoStock = "";
    if (ducktor.stock === 0) {
        textoStock = "Agotado";
    } else if (ducktor.stock <= 5) {
        textoStock = `¡Últimos ${ducktor.stock}!`;
    } else {
        textoStock = `Stock: ${ducktor.stock}`;
    }
    return `
        <article class="card">
            <a href="./detalle.html?id=${ducktor.id}">
                <img src="${ducktor.imagenGaleria}" alt="${ducktor.nombre}">
            </a>
            <div class="card-content">
                <h3>${ducktor.nombre}</h3>
                <p>${ducktor.subtitulo}</p>
                <div class="card-info">
                    <span class="price">${ducktor.precio.toFixed(2)}€</span>
                    <span class="stock">${textoStock}</span>
                </div>
            </div>
        </article>
    `;
});

contenedor.innerHTML = cardsProductos.join("");