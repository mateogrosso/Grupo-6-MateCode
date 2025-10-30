const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
  },
  valor: {
    type: String,
    required: true,
    trim: true,
  },
});
const productoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      required: true,
      trim: true,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    ficha: {
      type: [fichaSchema], // array de objetos con label y valor
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;