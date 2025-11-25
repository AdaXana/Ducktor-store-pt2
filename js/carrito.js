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
const addToCart = (productId, quantity = 1) => {
    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        existingItem.cantidad += quantity;
    } else {
        carrito.push({ id: productId, cantidad: quantity });
    }
    saveCart();
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

const productsData = [
    { id: 101, name: "Camiseta", price: 15.00 },
    { id: 202, name: "Pantalón", price: 40.00 }
];

addToCart(101, 2);
addToCart(202, 1);
console.log("Carrito después de añadir:", getCart());

updateQuantity(101, 5);
console.log("Carrito después de updateQuantity:", getCart());

console.log("Total:", calculateTotal(productsData));