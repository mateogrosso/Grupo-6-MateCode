const error404 = (req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
};

module.exports = error404;
