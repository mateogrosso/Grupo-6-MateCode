const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/orderController');

// POST /api/orders  -> crear pedido
router.post('/', verifyToken, createOrder);

// GET /api/orders   -> listar pedidos del usuario
router.get('/', verifyToken, getUserOrders);

module.exports = router;


