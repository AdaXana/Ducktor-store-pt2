import { productos } from './productos.js';

const params = new URLSearchParams(window.location.search);
const idDucktor = params.get('id') || "Fundacion";

let matchDucktor = null;

productos.forEach((ducktorX) => {
    if (ducktorX.id === idDucktor) {
        matchDucktor = ducktorX;
    }
});

const titulo = document.getElementById("nombre-pato");
titulo.textContent = matchDucktor.nombre;

const subtitulo = document.getElementById("subtitulo-pato");
subtitulo.textContent = matchDucktor.subtitulo;

const descripcion = document.getElementById("descripcion-pato");
descripcion.textContent = matchDucktor.descripcion;

const frase = document.getElementById("frase-pato");
frase.innerHTML = `<b>${matchDucktor.frase}</b>`;
frase.style.color = matchDucktor.color;

const ulCaracteristicas = document.getElementById("lista-caracteristicas");
ulCaracteristicas.innerHTML = "";
matchDucktor.caracteristicas.forEach((caracteristica) => {
    const item = document.createElement("li");
    item.textContent = caracteristica;
    ulCaracteristicas.appendChild(item);
});

const imgPrincipal = document.getElementById("img-principal");
imgPrincipal.src = matchDucktor.imagenGaleria;

const imagenFrontal = document.getElementById("img-frontal");
imagenFrontal.src = matchDucktor.imagenFrontal;

const imagenLateral = document.getElementById("img-lateral");
imagenLateral.src = matchDucktor.imagenLateral;

const precio = document.getElementById("precio-pato");
precio.textContent = `${matchDucktor.precio.toFixed(2)} €`;

const btnCarrito = document.getElementById("btn-add-carrito");
btnCarrito.dataset.id = matchDucktor.id;

const displayCantidad = document.getElementById("cantidad");
const btnMenos = document.getElementById("btn-menos");
const btnMas = document.getElementById("btn-mas");
const infoStock = document.getElementById("info-stock");

let contador = 1;

function comprobarStock() {
    if (matchDucktor.stock === 0) {
        infoStock.textContent = "Fuera de stock temporalmente";
        infoStock.className = "stock-mensaje stock-rojo";
        btnCarrito.disabled = true;
        btnCarrito.textContent = "Agotado";
        displayCantidad.textContent = "0";
    }
    else if (matchDucktor.stock <= 5) {
        infoStock.textContent = `¡Últimas ${matchDucktor.stock} unidades!`;
        infoStock.className = "stock-mensaje stock-naranja";
        btnCarrito.disabled = false;
        btnCarrito.textContent = "Agregar al carrito";
    }
    else {
        infoStock.textContent = "Stock disponible";
        infoStock.className = "stock-mensaje stock-verde";
        btnCarrito.disabled = false;
        btnCarrito.textContent = "Agregar al carrito";
    }
};
comprobarStock();

btnMenos.addEventListener("click", () => {
    if (contador > 1) {
        contador = contador - 1;
        displayCantidad.textContent = contador;
        infoStock.classList.remove("stock-rojo");
        comprobarStock();
    }
});

btnMas.addEventListener("click", () => {
    if (contador < matchDucktor.stock) {
        contador = contador + 1;
        displayCantidad.textContent = contador;
        comprobarStock();
    } else {
        infoStock.textContent = "Cantidad no disponible";
        infoStock.className = "stock-mensaje stock-rojo";
    }
});