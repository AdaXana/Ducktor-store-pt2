import { productos } from "./productos.js";

let carrito = [];

if (typeof localStorage !== 'undefined') {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} else {
    console.log("Nota: localStorage no está disponible en este entorno. Se inicia carrito vacío.");
}

const saveCart = () => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
};

const getCart = () => {
    return carrito;
};

const addToCart = (productId) => {
    const productInfo = productos.find(p => String(p.id) === String(productId));

    if (!productInfo) {
        console.error("Producto no encontrado con ID:", productId);
        return;
    }

    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.cantidad < productInfo.stock) {
            existingItem.cantidad++;
            console.log(`Sumado 1. Ahora tienes ${existingItem.cantidad} de ${productInfo.nombre}`);
        } else {
            console.warn(`No hay suficiente stock disponible. Solo quedan ${productInfo.stock} unidades.`);
            return;
        }
    } else {

        if (productInfo.stock > 0) {
            carrito.push({ id: productId, cantidad: 1 });
            console.log(`Producto ${productInfo.nombre} añadido al carrito.`);
        } else {
            console.warn("El producto está agotado.");
            return;
        }
    }
    saveCart();
    renderCart();
};

const updateQuantity = (productId, newQuantity) => {
    const productInfo = productos.find(p => p.id === productId);
    const existingItem = carrito.find(item => item.id === productId);

    const quantity = parseInt(newQuantity);

    if (!productInfo) {
        console.error("Producto no encontrado con ID:", productId);
        return;
    }

    if (isNaN(quantity) || quantity < 0) {
        console.error("La cantidad debe ser un número positivo.");
        return;
    }


    if (quantity === 0) {
        removeFromCart(productId);
        console.log(`Cantidad a 0: Ítem ${productId} eliminado.`);
    } else if (existingItem) {
        if (quantity > productInfo.stock) {
            console.warn(`No puedes pedir ${quantity}, solo hay ${productInfo.stock}.`);
            existingItem.cantidad = productInfo.stock;
        } else {
            existingItem.cantidad = quantity;
            console.log(`Cantidad de ${productInfo.nombre} actualizada a ${quantity}.`);
        }
        saveCart();

    } else if (quantity > 0) {
        if (quantity > productInfo.stock) {
            console.warn(`El producto es nuevo pero solo hay ${productInfo.stock} unidades. Se añadirá el máximo.`);
            carrito.push({ id: productId, cantidad: productInfo.stock });
        } else {
            carrito.push({ id: productId, cantidad: quantity });
            console.log(`Producto ${productInfo.nombre} añadido al carrito con cantidad ${quantity}.`);
        }
        saveCart();
    }
    renderCart();
};

const decrementQuantity = (productId) => {
    const existingItem = carrito.find(item => item.id === productId);
    if (existingItem) {
        updateQuantity(productId, existingItem.cantidad - 1);
    }
};


const removeFromCart = (productId) => {

    carrito = carrito.filter(item => item.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCart();
};

const calculateTotal = () => {
    const productMap = new Map(productos.map(p => [p.id, p.precio]));
    let total = 0;

    for (const item of carrito) {
        const price = productMap.get(item.id);
        if (price !== undefined) {
            total += price * item.cantidad;
        }
    }
    return total;
};

const renderCart = () => {
    const container = document.getElementById('lista-carrito');
    const totalDisplay = document.getElementById('total-carrito');

    if (!container || !totalDisplay) return;
    container.innerHTML = '';
    if (carrito.length === 0) {
        container.innerHTML += '<p style="text-align: center; margin-top: 1rem;">Tu carrito está vacío 🦆</p>';
        totalDisplay.textContent = '0.00€';
        return;
    }

    carrito.forEach((item) => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;

        const itemHTML = `
            <div class="item-carrito">
                
                <div class="info-producto">
                    <img src="${producto.imagenGaleria}" alt="${producto.nombre}">
                    <div class="detalles">
                        <p class="nombre">${producto.nombre}</p>
                        <p class="precio-unitario">${producto.precio.toFixed(2)}€</p>
                    </div>
                </div>

                <div class="controles-cantidad">
                    <button class="btn-cantidad" onclick="window.restarUnidad('${item.id}')">-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="window.sumarUnidad('${item.id}')">+</button>
                </div>

                <div class="total-borrar">
                    <p class="precio-subtotal">${subtotal.toFixed(2)}€</p>
                    <button class="btn-eliminar" onclick="window.removeFromCart('${item.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML += itemHTML;
    });

    const total = calculateTotal();
    totalDisplay.textContent = `${total.toFixed(2)}€`;
};


window.sumarUnidad = (id) => {

    const item = carrito.find(p => p.id === id);
    const productoOriginal = productos.find(p => p.id === id);

    if (item && productoOriginal) {
        if (item.cantidad < productoOriginal.stock) {
            item.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        } else {
            alert(`¡Ups! Solo tenemos ${productoOriginal.stock} unidades de este pato.`);
        }
    }
};

window.restarUnidad = (id) => {
    const item = carrito.find(p => p.id === id);

    if (item) {
        if (item.cantidad > 1) {
            item.cantidad--;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
        else {
            let confirmar = confirm("¿Quieres eliminar este pato del carrito?");
            if (confirmar) {
                removeFromCart(id);
            }
        }
    }
};

const vaciarCarrito = () => {
    let confirmar = confirm("¿Seguro que quieres eliminar todos los productos?");

    if (confirmar) {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCart();
    }
};

if (typeof window !== 'undefined') {
    window.removeFromCart = removeFromCart;
    window.sumarUnidad = sumarUnidad;
    window.restarUnidad = restarUnidad;
    window.vaciarCarrito = vaciarCarrito;

    document.addEventListener("DOMContentLoaded", renderCart);

    const btnPagar = document.getElementById('btn-pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            if (carrito.length > 0) {
                window.location.href = './recibo.html';
            } else {
                alert("El carrito está vacío");
            }
        });
    }
}

export {
    addToCart,
    removeFromCart,
    updateQuantity,
    decrementQuantity,
    getCart,
    calculateTotal,
    renderCart
};


