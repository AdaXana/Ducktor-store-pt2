import { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    decrementQuantity,
    getCart, 
    calculateTotal, 
    renderCart 
} from './js/carrito.js' 

console.log("--- INICIO DE PRUEBAS EN NODE.JS ---");

// 1. Prueba de inicio (Carrito vacío)
console.log("\n*** 1. Prueba: Carrito vacío ***");
renderCart(); 

// 2. Prueba de añadir ítems y sumar cantidad
console.log("\n*** 2. Prueba: Añadir Motivador (101) y Focus On (103) ***");
addToCart("Motivador"); 
addToCart("Motivador");
addToCart("Focus"); 
renderCart(); 

// 3. Prueba de stock agotado (Focus tiene stock 2, Intentamos 3)
console.log("\n*** 3. Prueba: Intentar sobrepasar stock de Focus (Stock: 2) ***");
addToCart("Focus"); 
addToCart("Focus");
renderCart(); 

// 4. Prueba de producto agotado (Zen Ducktor tiene stock 0)
console.log("\n*** 4. Prueba: Intentar añadir Zen Ducktor (Stock: 0) ***");
addToCart("Meditacion"); 
renderCart();

// 5. Prueba de actualización (actualizar Motivador a 5 unidades)
console.log("\n*** 5. Prueba: Actualizar Ducktor Motivator a 5 ***");
updateQuantity("Motivador", 5);
renderCart();

// 6. Prueba de disminución a cero (eliminación automática)
console.log("\n*** 6. Prueba: Decrementar Ducktor Motivator hasta eliminarlo ***");
decrementQuantity("Motivador"); 
updateQuantity("Motivador", 0); 
renderCart(); 

// 7. Prueba de cálculo final
console.log("\n*** 7. Prueba: Cálculo Total ***");
const total = calculateTotal();
console.log(`TOTAL GLOBAL CALCULADO: ${total.toFixed(2)}€`); 

console.log("--- FIN DE PRUEBAS ---");