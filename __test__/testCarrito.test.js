const ID_MOTIVADOR = 'Motivador';
const ID_FOCUS = 'Focus';
const ID_MEDITACION = 'Meditacion';
const FOCUS_STOCK_MAX = 2;
const PRECIO_UNITARIO = 12.00;

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
let addToCart, updateQuantity, decrementQuantity, getCart, calculateTotal;

describe('Funcionalidad Completa del Carrito (Usando Jest)', () => {
    beforeEach(async () => {
        localStorage.clear();

        jest.resetModules();

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


    test('6. Debe eliminar el producto del carrito si la cantidad llega a 0', () => {
        addToCart(ID_MOTIVADOR);

        decrementQuantity(ID_MOTIVADOR);

        const motivador = getCart().find(item => item.id === ID_MOTIVADOR);
        expect(motivador).toBeUndefined();
    });

    test('7. Debe calcular el total correctamente (Focus On x2 = 24.00)', () => {
        updateQuantity(ID_FOCUS, FOCUS_STOCK_MAX);

        const totalEsperado = PRECIO_UNITARIO * FOCUS_STOCK_MAX;
        const totalCalculado = calculateTotal();
        expect(totalCalculado).toBe(totalEsperado);
    });
});