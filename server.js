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
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Users' }
});

const User = mongoose.model('User', userSchema);

// Modelo de Habitacion
const HabitacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  disponible: { type: Boolean, required: true },
  fechaEntrada: { type: Date },
  fechaSalida: { type: Date },
});

const Habitacion = mongoose.model('Habitacion', HabitacionSchema);

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
    const { nombre, disponible, fechaEntrada, fechaSalida } = req.body;

    // Crear una nueva instancia del modelo "Habitacion"
    const nuevaHabitacion = new Habitacion({
      nombre,
      disponible,
      fechaEntrada,
      fechaSalida
    });

    // Guardar la nueva habitación en la base de datos
    await nuevaHabitacion.save();

    // Responder con la habitación creada
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    console.error('Error al crear la habitación:', error);
    res.status(500).json({ message: 'Error al crear la habitación' });
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

    res.json({ username: user.name, role: user.role });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Endpoint para registrar un nuevo usuario
// Endpoint para registrar un nuevo usuario
app.post('/auth/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crea el nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword, role });
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

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
