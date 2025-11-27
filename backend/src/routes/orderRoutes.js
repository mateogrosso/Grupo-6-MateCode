const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
    try {
        const { items, total } = req.body;

        const newOrder = new Order({
            user: req.user.id,
            items,
            total
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
});

module.exports = router;