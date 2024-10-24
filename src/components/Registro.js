// Registro.js
import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para registrar un nuevo usuario
  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del nuevo usuario a la API
      await axios.post('http://localhost:3001/register', { name, email, password }); // Cambiar a '/register'
      alert('Usuario registrado exitosamente');
      // Opcionalmente, puedes redirigir al usuario a otra página o limpiar el formulario aquí.
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={registrarUsuario}>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Correo" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
