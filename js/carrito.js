// 1. Inicializar carrito
import { productos } from "./productos.js";

// Comprobamos si localStorage existe antes de intentar leerlo
let carrito = [];

if (typeof localStorage !== 'undefined') {
    // Estamos en el navegador
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} else {
    // Estamos en VS Code (Node.js), iniciamos vacío sin leer nada
    console.log("Nota: localStorage no está disponible en este entorno. Se inicia carrito vacío.");
}

// Función auxiliar para guardar el carrito si se cierra el navegador
const saveCart = () => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
};

// 2. Obtener carrito
const getCart = () => {
    return carrito;
};

// 3. Añadir al carrito
const addToCart = (productId) => {
    const productInfo = productos.find(p => p.id === productId); // Buscamos el producto en la lista importada (productos.js)

    if (!productInfo) {
        console.error("Producto no encontrado con ID:", productId);
        return;
    }

    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        // CASO A: YA EXISTE EN EL CARRITO 
        if (existingItem.cantidad < productInfo.stock) {
            existingItem.cantidad++; // Validamos Stock antes de sumar
            console.log(`Sumado 1. Ahora tienes ${existingItem.cantidad} de ${productInfo.nombre}`);
        } else {
            console.warn(`No hay suficiente stock disponible. Solo quedan ${productInfo.stock} unidades.`);
            return;
        }
    } else {
        // CASO B: ES NUEVO EN EL CARRITO
        if (productInfo.stock > 0) { // Validamos que haya al menos 1 en stock
            carrito.push({ id: productId, cantidad: 1 });
            console.log(`Producto ${productInfo.nombre} añadido al carrito.`);
        } else {
            console.warn("El producto está agotado.");
            return;
        }
    }
    saveCart(); // Guardar cambios en localStorage
    renderCart(); // Llamar a renderCart después de modificar
};


// 4. Actualizar cantidad en el carrito
const updateQuantity = (productId, newQuantity) => {
    const productInfo = productos.find(p => p.id === productId);
    const existingItem = carrito.find(item => item.id === productId);


    if (!productInfo || !existingItem) {
        console.error("Ítem o producto no encontrado para actualizar cantidad.");
        return;
    }

    const quantity = parseInt(newQuantity);

    if (isNaN(quantity) || quantity < 0) {
        console.error("La cantidad debe ser un número positivo.");
        return;
    }

    if (quantity === 0) {
        // Lógica: Si cantidad llega a 0 -> eliminar item
        removeFromCart(productId);
        console.log(`Cantidad a 0: Ítem ${productId} eliminado.`);
    } else if (quantity > productInfo.stock) {
        console.warn(`No puedes pedir ${quantity}, solo hay ${productInfo.stock}.`);
        //  Establecer la cantidad al máximo de stock si deseas
        existingItem.cantidad = productInfo.stock;
    } else {
        existingItem.cantidad = quantity;
        saveCart();
        console.log(`Cantidad de ${productInfo.nombre} actualizada a ${quantity}.`);
    }

    renderCart(); // Llamar a renderCart después de modificar
};

// Función auxiliar para restar 1 unidad (útil para botones de decremento)
const decrementQuantity = (productId) => {
    const existingItem = carrito.find(item => item.id === productId);
    if (existingItem) {
        updateQuantity(productId, existingItem.cantidad - 1);
    }
};

// 5. Eliminar del carrito
const removeFromCart = (productId) => {
    carrito = carrito.filter(item => item.id !== productId);
    saveCart();
    console.log(`Producto ${productId} eliminado.`);
    renderCart(); // Llamar a renderCart después de modificar
};

// 6. Calcular Total
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

// 7. Renderizar el Carrito
const renderCart = () => {
    console.log("--- RENDERING CART ---");

    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        console.log("-----------------------");
        return;
    }

    const productMap = new Map(productos.map(p => [p.id, { nombre: p.nombre, precio: p.precio }]));
    console.log("Ítems en el Carrito:");

    // Usamos .map() para procesar cada ítem y .reduce() para calcular el Subtotal Global
    const totalGlobal = carrito.reduce((globalAcc, item) => {
        const info = productMap.get(item.id);
        if (info) {
            const subtotal = info.precio * item.cantidad; // Subtotal por ítem
            console.log(`  - ${info.nombre} (${item.id}): ${item.cantidad} x ${info.precio.toFixed(2)}€ = Subtotal: ${subtotal.toFixed(2)}€`);

            return globalAcc + subtotal; // Acumular para el total global
        }
        return globalAcc;
    }, 0);

    console.log("-----------------------");
    console.log(`TOTAL GLOBAL: ${totalGlobal.toFixed(2)}€`);
    console.log("-----------------------");

    // En un entorno de navegador, aquí se manipularía el DOM
};



// --- ZONA DE EXPORTACIÓN PARA NODE.JS ---
export {
    addToCart,
    removeFromCart,
    updateQuantity,
    decrementQuantity,
    getCart,
    calculateTotal,
    renderCart,
};


// --- ZONA DE PRUEBAS ---

if (typeof window !== 'undefined') {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.getCart = getCart;
    window.calculateTotal = calculateTotal;
    window.clearCart = () => { carrito = []; saveCart(); console.log("Carrito vaciado"); };
}