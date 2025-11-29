const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { items, total } = req.body; 

    if (!items || items.length === 0) {
        res.status(400).json({ message: 'No se puede crear un pedido sin artículos.' });
        return;
    } else {
        try {
            const newOrder = new Order({
                user: req.user._id, 
                items,              
                total,              
            });

            const createdOrder = await newOrder.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            res.status(500).json({ 
                message: 'Error interno del servidor al procesar el pedido.', 
                error: error.message 
            });
        }
    }
};

module.exports = { createOrder };