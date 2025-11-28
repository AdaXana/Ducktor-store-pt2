// __tests__/testCarrito.test.js


// Definición de IDs y datos clave para las pruebas
// USAMOS LOS STRINGS DE ID EXACTOS DEl ARCHIVO productos.js
const ID_MOTIVADOR = 'Motivador';   // Stock: 10, Precio: 12.00
const ID_FOCUS = 'Focus';           // Stock: 2, Precio: 12.00
const ID_MEDITACION = 'Meditacion'; // Stock: 0, Precio: 12.00
const FOCUS_STOCK_MAX = 2;          // Stock de Focus
const PRECIO_UNITARIO = 12.00;     // Stock de Focus


// --- Configuración de Entorno de Pruebas ---
// Jest Mock para simular localStorage si no está disponible (Necesario para Node/Jest)
if (typeof localStorage === 'undefined') {
    global.localStorage = {
        store: {},
        getItem: function (key) { return this.store[key]; },
        setItem: function (key, value) { this.store[key] = value.toString(); },
        clear: function () { this.store = {}; }
    };
}
if (typeof document === 'undefined') {
    global.document = {
        getElementById: () => ({
            innerHTML: '',
            textContent: '',
            addEventListener: () => { }
        })
    };
}

// Usamos una variable global para almacenar las funciones importadas
let addToCart, updateQuantity, decrementQuantity, getCart, calculateTotal;

describe('Funcionalidad Completa del Carrito (Usando Jest)', () => {

    // Reinicia el estado del módulo y del localStorage antes de cada test.
    beforeEach(async () => {
        // 1. Limpia el localStorage para evitar errores entre tests
        localStorage.clear();

        // 2. IMPORTANTE: Reinicia el caché de módulos para forzar la re-ejecución de carrito.js, lo que reinicia la variable 'carrito = []' interna.
        jest.resetModules();

        // 3. Vuelve a importar las funciones
        const carritoModule = await import('../js/carrito.js');
        addToCart = carritoModule.addToCart;
        updateQuantity = carritoModule.updateQuantity;
        decrementQuantity = carritoModule.decrementQuantity;
        getCart = carritoModule.getCart;
        calculateTotal = carritoModule.calculateTotal;

    });


    test('1. El carrito debe estar vacío al inicio (limpieza en beforeEach)', () => {
        const carrito = getCart();
        expect(carrito.length).toBe(0);
    });

    test('2. Debe añadir dos productos diferentes y sumar cantidad si ya existe', () => {
        addToCart(ID_MOTIVADOR);
        addToCart(ID_MOTIVADOR);
        addToCart(ID_FOCUS);

        const carrito = getCart();
        expect(carrito.length).toBe(2);

        const motivador = carrito.find(item => item.id === ID_MOTIVADOR);
        expect(motivador.cantidad).toBe(2);
    });

    test('3. No debe sobrepasar el stock al añadir un producto (Focus Stock: 2)', () => {
        addToCart(ID_FOCUS);
        addToCart(ID_FOCUS);
        addToCart(ID_FOCUS);

        const focusItem = getCart().find(item => item.id === ID_FOCUS);
        expect(focusItem.cantidad).toBe(FOCUS_STOCK_MAX);
    });

    test('4. No debe añadir productos con stock 0 (Zen Ducktor)', () => {
        addToCart(ID_MEDITACION);
        expect(getCart().find(item => item.id === ID_MEDITACION)).toBeUndefined();
    });

    test('5. Debe actualizar la cantidad de un producto a 5', () => {
        addToCart(ID_MOTIVADOR);
        updateQuantity(ID_MOTIVADOR, 5);

        const motivador = getCart().find(item => item.id === ID_MOTIVADOR);
        expect(motivador.cantidad).toBe(5);
    });


    // 6. Debe eliminar el producto del carrito si la cantidad llega a 0 
    test('6. Debe eliminar el producto del carrito si la cantidad llega a 0', () => {
        // Setup: Aseguramos que Motivador está con una cantidad de 1 gracias a addToCart
        addToCart(ID_MOTIVADOR);

        // Usamos decrement para bajar de 1 a 0 que debe eliminarlo usando updateQuantity(id, 0)
        decrementQuantity(ID_MOTIVADOR);

        const motivador = getCart().find(item => item.id === ID_MOTIVADOR);
        // El producto ya no debe existir en el carrito.
        expect(motivador).toBeUndefined();
    });

    // 7. Prueba de cálculo final 
    test('7. Debe calcular el total correctamente (Focus On x2 = 24.00)', () => {

        // Setup: Limpio por el beforeEach, solo añadimos Focus On (2 unidades)
        updateQuantity(ID_FOCUS, FOCUS_STOCK_MAX);

        const totalEsperado = PRECIO_UNITARIO * FOCUS_STOCK_MAX;
        const totalCalculado = calculateTotal();
        expect(totalCalculado).toBe(totalEsperado);
    });
});