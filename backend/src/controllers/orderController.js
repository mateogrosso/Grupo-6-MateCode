// controllers/orderController.js
const Order = require('../models/Order');

// Crear orden
const createOrder = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ message: 'No se puede crear un pedido sin artículos.' });
  }

  try {
    const newOrder = new Order({
      user: req.user.id,  // 🔹 viene del token, lo setea el authMiddleware
      items,
      total,
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({
      message: 'Error interno del servidor al procesar el pedido.',
      error: error.message,
    });
  }
};
// Obtener las órdenes del usuario logueado
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener los pedidos' });
  }
};

module.exports = { createOrder, getUserOrders };
