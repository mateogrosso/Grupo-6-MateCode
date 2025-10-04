const productos = require('../data/productos');

function getProductos (req, res) {
    res.json(productos);
};

function getProductoById (req, res) {
    const id = req.params.id;
    const producto = productos.find(p => p.id.toLowerCase() === id.toLowerCase());
    if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
};


module.exports = {getProductos, getProductoById};