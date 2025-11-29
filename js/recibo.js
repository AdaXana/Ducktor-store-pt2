import { productos } from "./productos.js";

const listaTicket = document.getElementById("lista-ticket");
const precioFinal = document.getElementById("precio-final");

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const filasTicket = carrito.map((item) => {

    const productoCompleto = productos.find(p => p.id === item.id);

    if (!productoCompleto) {
        console.warn(`Producto con ID ${item.id} no encontrado en el catálogo.`);
        return '';
    }

    const subtotal = productoCompleto.precio * item.cantidad;

    return `
        <tr>
            <td class="product-col">
                <span>${productoCompleto.nombre}</span> 
            </td>
            <td>${productoCompleto.precio.toFixed(2)}€</td>
            <td>${item.cantidad}</td>
            <td style="text-align: right;">${subtotal.toFixed(2)}€</td>
        </tr>
    `;
});

listaTicket.innerHTML = filasTicket.join("");

const btnVolverYVaciar = document.getElementById("btn-volver-y-vaciar");

if (btnVolverYVaciar) {
    btnVolverYVaciar.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        window.location.href = "../index.html";
    });
}

const totalCalculado = carrito.reduce((acumulado, item) => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
        return acumulado + (producto.precio * item.cantidad);
    }
    return acumulado;
}, 0);

precioFinal.textContent = `${totalCalculado.toFixed(2)}€`;

const btnVolver = document.querySelector('.btn-volver');

if (btnVolver) {
    btnVolver.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        console.log("Carrito vaciado al salir.");
    });
}