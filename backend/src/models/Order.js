const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            nombre: String,
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: 'pendiente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);