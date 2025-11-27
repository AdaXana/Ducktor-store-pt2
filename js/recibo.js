const listaTicket = document.getElementById("lista-ticket");
const precioFinal = document.getElementById("precio-final");

// // array de prueba para ver * y + de recibo, listo para enlazar con codigo carrito Ana
// const carrito = [
//     {
//         nombre: "Duktor FocusOn",
//         precio: 12,
//         cantidad: 5,
//     },
//     {
//         nombre: "Duktor Motivador",
//         precio: 12,
//         cantidad: 3,
//     }
// ]

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const filasTicket = carrito.map((item) => {
    const subtotal = item.precio * item.cantidad;
    return `
        <tr>
            <td class="product-col">
                <span>${item.nombre}</span>
            </td>
            <td>${item.precio.toFixed(2)}€</td>
            <td>${item.cantidad}</td>
            <td style="text-align: right;">${subtotal.toFixed(2)}€</td>
        </tr>
    `;
});
listaTicket.innerHTML = filasTicket.join("");

const totalCalculado = carrito.reduce((acumulado, item) => {
    return acumulado + (item.precio * item.cantidad);
}, 0);
precioFinal.textContent = `${totalCalculado.toFixed(2)}€`;