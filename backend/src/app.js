const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productosRoutes');
const logger = require('./middlewares/logger');
const error404 = require('./middlewares/error404');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas principales
app.use('/api/productos', productosRoutes);

// Ruta del formulario de contacto
app.post('/api/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  console.log('🟢 Nuevo mensaje de contacto:', { nombre, email, mensaje });
  res.status(200).json({ message: 'Mensaje recibido correctamente.' });
});

// Middleware para rutas inexistentes (404)
app.use(error404);

// Middleware de manejo general de errores
app.use((err, req, res, next) => {
  console.error('❌ Error interno:', err.stack);
  res.status(err.status || 500).json({
    mensaje: err.message || 'Error interno del servidor',
  });
});

module.exports = app;
