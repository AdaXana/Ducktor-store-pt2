import { productos } from './productos.js';
// 1. IMPORTAR LA FUNCIÓN NECESARIA
import { addToCart, updateQuantity, getCart } from './carrito.js'; 

const params = new URLSearchParams(window.location.search);
const idDucktor = params.get('id') || "Fundacion";

let matchDucktor = null;

// Búsqueda del producto
productos.forEach((ducktorX) => {
    if (ducktorX.id === idDucktor) {
        matchDucktor = ducktorX;
    }
});

// ********** Lógica de Carga de Contenido y Stock **********

const titulo = document.getElementById("nombre-pato");
titulo.textContent = matchDucktor.nombre; 

const precio = document.getElementById("precio-pato");
precio.textContent = `${matchDucktor.precio.toFixed(2)} €`;

const btnCarrito = document.getElementById("btn-add-carrito");
btnCarrito.dataset.id = matchDucktor.id; // Se mantiene el data-id

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

// ********** Lógica de +/- Cantidad **********

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

// ********** LÓGICA DE ENLACE CON CARRITO.JS **********

btnCarrito.addEventListener("click", () => {
    if (!matchDucktor || contador === 0) return;

    // 1. Obtener el carrito actual para saber si el producto YA está dentro
    const carritoActual = getCart(); 
    const itemEnCarrito = carritoActual.find(item => item.id === matchDucktor.id);
    
    let nuevaCantidad = contador;
    if (itemEnCarrito) {
        // 2. Si ya está, la nueva cantidad será la suma de la existente + el contador de la página.
        nuevaCantidad += itemEnCarrito.cantidad;
    }
    
    // 3. Usamos updateQuantity para gestionar el stock y la cantidad total.
    // Esto es más limpio que llamar a addToCart 'contador' veces.
    updateQuantity(matchDucktor.id, nuevaCantidad);

    alert(`¡Añadido! Has metido ${contador} ${matchDucktor.nombre} en el carrito.`);
    
    contador = 1;
    displayCantidad.textContent = contador;
    comprobarStock();
});