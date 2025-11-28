const listaTicket = document.getElementById("lista-ticket");
const precioFinal = document.getElementById("precio-final");


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


const btnVolver = document.querySelector('.btn-volver');

if (btnVolver) {
    btnVolver.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        console.log("Carrito vaciado al salir.");
    });
}