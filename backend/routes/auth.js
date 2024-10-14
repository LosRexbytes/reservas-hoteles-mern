const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/User'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body; // Cambié 'name' por 'nombre'

    // Validación básica
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Formato de email inválido', field: 'email' });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUser = await User.findOne({ username: nombre });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso', field: 'username' });
    }

    // Verificar si el correo electrónico ya existe
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso', field: 'email' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username: nombre, // Asegúrate de que este campo esté en tu esquema
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para el login de usuarios
router.post('/login', async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;

    // Validación básica
    if (!usernameEmail || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Buscar usuario por nombre de usuario o email
    const user = await User.findOne({
      $or: [{ username: usernameEmail }, { email: usernameEmail }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Puedes agregar un token JWT aquí si lo deseas
    res.json({ message: 'Login exitoso', username: user.username });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
