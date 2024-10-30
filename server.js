const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/DBHOTEL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión a MongoDB exitosa');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 8, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Modelo de Habitacion
const habitacionSchema = new mongoose.Schema({
  room_type: { type: String, required: true },
  price_per_night: { type: Number, required: true },
  availability: { type: Boolean, required: true }
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);

// Modelo de Reservación
const reservationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true },
  check_in_date: { type: Date, required: true },
  check_out_date: { type: Date, required: true },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ['iniciado', 'finalizado'], required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Endpoint para obtener habitaciones
app.get('/api/habitacions', async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    console.error('Error al cargar habitaciones:', error);
    res.status(500).json({ message: 'Error al cargar las habitaciones' });
  }
});

// Endpoint para crear una nueva habitación
app.post('/api/habitacions', async (req, res) => {
  try {
    const { room_type, price_per_night, availability } = req.body;

    const nuevaHabitacion = new Habitacion({
      room_type,
      price_per_night,
      availability
    });

    await nuevaHabitacion.save();
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    console.error('Error al crear la habitación:', error);
    res.status(500).json({ message: 'Error al crear la habitación' });
  }
});

// Endpoint para registrar un nuevo usuario
app.post('/auth/register', async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
});

// Endpoint para iniciar sesión
app.post('/auth/login', async (req, res) => {
  const { usernameEmail, password } = req.body;

  try {
    const user = await User.findOne({ email: usernameEmail });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ username: user.username, role: user.role });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Endpoint para crear una reservación
app.post('/api/reservations', async (req, res) => {
  const { user_id, room_id, check_in_date, check_out_date, total_price, status } = req.body;

  try {
    const newReservation = new Reservation({
      user_id,
      room_id,
      check_in_date,
      check_out_date,
      total_price,
      status
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error al crear la reservación:', error);
    res.status(500).json({ message: 'Error al crear la reservación' });
  }
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
