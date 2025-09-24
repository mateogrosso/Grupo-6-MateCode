const express = require('express');
const { getProductos, getProductoById } = require('../controllers/productos.controllers');
const router = express.Router();

// acá sí van las rutas
router.get('/', getProductos);
router.get('/:id', getProductoById);

module.exports = router;

