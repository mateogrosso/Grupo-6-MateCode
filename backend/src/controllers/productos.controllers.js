const Producto = require('../models/Producto');

const getProductos = async (req, res) => {
    try {
      const productos = await Producto.find();

      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: `Error al obtener los productos` });
    }
 };

const getProductoById = async (req, res) => {
  try {
    const slug = (req.params.id || '').trim();
    const producto = await Producto.findOne({ id: slug });
    // const producto = await Producto.findById(req.params.id); Lo tenia asi pero no anda porque termina convirtiendo el id a ObjectId (creo)
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: `Error al buscar el producto con ID ${req.params.id}` });
  }
};

const getProductosDestacados = async (req, res) => {
  try {
    const productosDestacados = await Producto.find({ destacado: true });
    res.status(200).json(productosDestacados);
  } catch (error) {
    console.error('Error al obtener productos destacados:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener productos destacados' });
  }
};

const crearProducto = async (req, res) => {
  try {
    const existente = await Producto.findOne({ id: req.body.id });
    if (existente) {
      return res.status(400).json({ mensaje: 'Ya existe un producto con ese id' });
    }

    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
  }
};

const actualizarProducto = async (req,res) => {
  try {

    const slug = (req.params.id || '').trim();
    const datosActualizados = req.body; 

    const productoActualizado = await Producto.findOneAndUpdate(
      { id: slug },            
      datosActualizados,      
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizado); 
    } catch (error) {
      console.error(error);
      res.status(400).json( { mensaje: `Error al actualizar el producto`} )
    }
}


const eliminarProducto = async (req, res) => {
  try {
    
    const slug = (req.params.id || '').trim(); // limpia espacios
    const productoEliminado = await Producto.findOneAndDelete({ id: slug });
    //const productoEliminado = await Producto.findByIdAndDelete(req.params.id); Lo tenia asi pero no anda porque termina convirtiendo el id a ObjectId (creo)
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};

module.exports = {getProductos, getProductoById, crearProducto, actualizarProducto, eliminarProducto, getProductosDestacados};