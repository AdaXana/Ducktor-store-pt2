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
    
    const productoCompleto = productos.find(p => String(p.id) === String(item.id));
    
    // 1. Manejo del caso de ERROR (Producto NO encontrado)
    if (!productoCompleto) { 
        // Si no se encuentra el producto, devolvemos el valor 'acumulado' sin cambios
        console.warn(`Producto con ID ${item.id} omitido en el cálculo total (no encontrado).`);
        return acumulado; // <-- Corregido: Devuelve el valor anterior
    }
    
    // 2. Manejo del caso OK (Producto encontrado)
    // Si llegamos aquí, el producto existe. Calculamos el subtotal y lo sumamos al acumulado.
    return acumulado + (productoCompleto.precio * item.cantidad);
    
}, 0); // El 0 es el valor inicial del 'acumulado'

precioFinal.textContent = `${totalCalculado.toFixed(2)}€`;