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

function getProductosDestacados(req, res) {
  const destacados = productos.filter(p => p.destacado === true);

  // Si no la hay, devolvemos los primeros 4
  // los devolveria con const destacados = productos.slice(0, 4);

  res.status(200).json(destacados);
}


module.exports = {getProductos, getProductoById, getProductosDestacados};
