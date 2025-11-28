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
                <span>${productoCompleto.nombre}</span> </td>
            <td>${productoCompleto.precio.toFixed(2)}€</td> <td>${item.cantidad}</td>
            <td style="text-align: right;">${subtotal.toFixed(2)}€</td>
        </tr>
    `;
});
listaTicket.innerHTML = filasTicket.join("");

const totalCalculado = carrito.reduce((acumulado, item) => {

    const productoCompleto = productos.find(p => String(p.id) === String(item.id));

    if (!productoCompleto) {

        console.warn(`Producto con ID ${item.id} omitido en el cálculo total (no encontrado).`);
        return acumulado;
    }

    return acumulado + (productoCompleto.precio * item.cantidad);

}, 0);


const btnVolverYVaciar = document.getElementById("btn-volver-y-vaciar");

if (btnVolverYVaciar) {
    btnVolverYVaciar.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        window.location.href = "../index.html";
    });
}

precioFinal.textContent = `${totalCalculado.toFixed(2)}€`;