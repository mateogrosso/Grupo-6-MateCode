const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoById,
  getProductosDestacados,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productos.controllers');

// GET -- /api/productos/destacados
router.get('/destacados', getProductosDestacados);

// GET -- /api/productos
router.get('/', getProductos);

// GET -- /api/productos/:id
router.get('/:id', getProductoById);

// POST -- /api/productos
router.post('/', crearProducto);

// PUT -- /api/productos/:id
router.put('/:id', actualizarProducto);

// DELETE -- /api/productos/:id
router.delete('/:id', eliminarProducto);

module.exports = router;
