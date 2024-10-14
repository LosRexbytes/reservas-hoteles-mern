// Cargar variables de entorno desde el archivo .env
require('dotenv').config();
// Importar dependencias necesarias
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
// Crear la aplicación Express
const app = express();
// Conectar a la base de datos
connectDB();
// Middleware para habilitar CORS
app.use(cors());
// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());
// Rutas de autenticación
app.use('/auth', authRoutes);
// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;
// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
// Manejo de errores no capturados (opcional, pero recomendado)
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});