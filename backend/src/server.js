require('dotenv').config();
const mongo = require('./db');
const app = require('./app');
const PORT = process.env.PORT || 4000;


const iniciarServidor = async () => {
  await mongo.conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

iniciarServidor();


