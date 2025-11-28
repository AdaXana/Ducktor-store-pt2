import { productos } from "./productos.js";

const listaTicket = document.getElementById("lista-ticket");
const precioFinal = document.getElementById("precio-final");


const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const filasTicket = carrito.map((item) => {
    
    // 1. Buscamos el producto completo para obtener nombre y precio
    const productoCompleto = productos.find(p => p.id === item.id);
    
    // VALIDACIÓN: Si el producto no existe en el catálogo, podemos ignorarlo o mostrar un error.
    if (!productoCompleto) {
        console.warn(`Producto con ID ${item.id} no encontrado en el catálogo.`);
        return ''; // Retornamos cadena vacía para omitir esta fila
    }

    // 2. Usamos las propiedades del productoCompleto
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
    return acumulado + (item.precio * item.cantidad);
}, 0);

precioFinal.textContent = `${totalCalculado.toFixed(2)}€`;


const btnVolver = document.querySelector('.btn-volver');

if (btnVolver) {
    btnVolver.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        console.log("Carrito vaciado al salir.");
    });
}
