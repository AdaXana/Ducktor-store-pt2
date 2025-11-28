module.exports = {
  // 1. Usar el entorno de simulación del navegador (soluciona ReferenceError: window is not defined)
  testEnvironment: 'jsdom',
  
  // 2. Asegurarse de que Babel sea el transformador para archivos .js y .jsx
  // Esto maneja la sintaxis 'import' y 'export'.
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', 
  },
  
  // 3. Jest busca pruebas en esta carpeta (si seguiste la recomendación)
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
};