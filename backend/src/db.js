const mongoose = require('mongoose');


//Conexion de mongoose

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // corta la app si no se conecta
  }
};


module.exports = { conectarDB };