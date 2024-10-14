const mongoose = require('mongoose');

// Configura la opción `strictQuery`
mongoose.set('strictQuery', false); // o true, según tu preferencia

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/DBHOTEL', { //mongodb://localhost:27017/DBHOTEL
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado...');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

