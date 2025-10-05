const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoById,
  getProductosDestacados
} = require('../controllers/productos.controllers');

// /api/productos/destacados
router.get('/destacados', getProductosDestacados);

// /api/productos
router.get('/', getProductos);

// /api/productos/:id
router.get('/:id', getProductoById);



module.exports = router;
