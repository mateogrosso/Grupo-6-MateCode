const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productosRoutes.js');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware global
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Para JSON (POST/PUT futuros)
app.use(express.json());

// CORS para que el client (React) pueda llamar a esta API en dev
app.use(cors());

// Rutas de API
app.use('/api/productos', productRoutes);

// Catch-all 404 para rutas inexistentes
app.use((req, _res, next) => {
  const err = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// Manejador central de errores
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});