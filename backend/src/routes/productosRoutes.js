const express = require('express');
const router = express.Router();
const productos = require('../data/productos.js');

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  res.json(productos);
});

// Ruta para obtener un producto por ID
router.get('/:id', (req, res, next) => {
  const id = req.params.id.toLowerCase();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    return next(error);
  }

  res.json(producto);
});

module.exports = router;