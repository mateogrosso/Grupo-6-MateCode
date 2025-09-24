const express = require('express');
const app = express();

const productosRouter = require('./routes/productos.routes');

const logger = require('./middlewares/logger');
const error404 = require('./middlewares/error404');

app.use(express.json());
app.use(logger);
app.use('/api/productos', productosRouter);

app.use(error404);
app.use((err,req,res,next) => {
    console.error(err.stack); //muestra en que parte esta el error. 
    res.status(500).json({mensaje: "Error interno del servidor"});
});


module.exports = app;
