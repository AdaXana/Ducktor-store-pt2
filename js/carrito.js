// 1. Inicializar carrito
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
    if (typeof productsData === 'undefined') {
        console.error("Error: No de han cargado los productos (productsData). Revisa el HTML");
        return;
    }

    const productInfo = productsData.find(p => p.id === productId);
    if (!productInfo) {
        console.error("Producto no encontrado");
        return;
    }

    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.cantidad < productInfo.stock) { // CASO A: YA EXISTE EN EL CARRITO 
            existingItem.cantidad++; // Validamos Stock antes de sumar
            console.log(`Sumado 1. Ahora tienes ${existingItem.cantidad} de ${productInfo.name}`);
        } else {
            console.warn(`No hay suficiente stock disponible. Solo quedan ${productInfo.stock} unidades.`);
            return;
        }
    } else { // CASO B: ES NUEVO EN EL CARRITO
        if (productInfo.stock > 0) { // Validamos que haya al menos 1 en stock
            carrito.push({ id: productId, cantidad: 1 });
            console.log(`Producto ${productInfo.name} añadido al carrito.`);
        } else {
            console.warn("El producto está agotado.");

            return;
        }
    }
    saveCart(); // Guardar cambios en localStorage
};


// 4. Actualizar cantidad en el carrito
const updateQuantity = (productId, newQuantity) => {
    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            existingItem.cantidad = newQuantity;
            saveCart();
        }
    }
};

// 5. Eliminar del carrito
const removeFromCart = (productId) => {
    carrito = carrito.filter(item => item.id !== productId);
    saveCart();
};

// 6. Calcular Total
const calculateTotal = (productsData) => {
    const productMap = new Map(productsData.map(p => [p.id, p.price]));
    let total = 0;

    for (const item of carrito) {
        const price = productMap.get(item.id);
        if (price !== undefined) {
            total += price * item.cantidad;
        }
    }
    return total;
};



// --- ZONA DE PRUEBAS ---

console.log("--- Inicio de Pruebas ---");

const testProducts = [
    { id: 101, name: "Camiseta", price: 15.00, stock: 10 }, // Tiene stock
    { id: 202, name: "Pantalón", price: 40.00, stock: 2 }   // Tiene poco stock
];

productsData = testProducts;


console.log("1. Intentando añadir Camiseta (stock 10)...");
addToCart(101);
addToCart(101);
console.log("Carrito:", getCart());


console.log("2. Intentando añadir Pantalón (stock 2)...");
addToCart(202);
addToCart(202);
addToCart(202);
console.log("Carrito:", getCart());


console.log("3. Probando updateQuantity a 5...");

updateQuantity(101, 5);
console.log("Carrito tras update:", getCart());

console.log("Total a pagar:", calculateTotal(testProducts));