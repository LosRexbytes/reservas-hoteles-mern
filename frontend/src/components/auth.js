// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Guarda el usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

module.exports = router;
