import { productos } from './productos.js';
import { updateQuantity, getCart } from './carrito.js';


// ------------------------------------------
// 2. INICIALIZACIÓN Y CARGA DE DATOS DEL PRODUCTO
// ------------------------------------------

const params = new URLSearchParams(window.location.search);
const idDucktor = params.get('id') || "Fundacion";

let matchDucktor = null;

// Búsqueda del producto
productos.forEach((ducktorX) => {
    if (ducktorX.id === idDucktor) {
        matchDucktor = ducktorX;
    }
});

// Comprobación básica de existencia
if (!matchDucktor) {
    console.error(`Producto con ID "${idDucktor}" no encontrado.`);
    //Redirigir o mostrar un error en el DOM
}


// --- Manipulación del DOM para cargar información ---

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

// --- Funciones de Stock y Contador ---

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

// ------------------------------------------
// 3. LÓGICA DE ENLACE CON CARRITO.JS
// ------------------------------------------

btnCarrito.addEventListener("click", () => {
    if (!matchDucktor || contador === 0) return;

    // Obtener el carrito actual
    const carritoActual = getCart();
    const itemEnCarrito = carritoActual.find(item => item.id === matchDucktor.id);

    let nuevaCantidad = contador;
    if (itemEnCarrito) {
        // Sumar la cantidad existente a la cantidad seleccionada en la página
        nuevaCantidad += itemEnCarrito.cantidad;
    }

    // Llamar a updateQuantity. 
    updateQuantity(matchDucktor.id, nuevaCantidad);

    alert(`¡Añadido! Has metido ${contador} ${matchDucktor.nombre} en el carrito.`);

    // Resetear contador a 1 después de añadir al carrito
    contador = 1;
    displayCantidad.textContent = contador;
    comprobarStock();
});