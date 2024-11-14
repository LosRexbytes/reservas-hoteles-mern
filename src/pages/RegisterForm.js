import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmarContraseña: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({
    password: [],
    passwordMatch: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      validatePassword(value);
    }

    if (name === 'confirmarContraseña') {
      checkPasswordMatch(formData.password, value);
    }
  };

  const validatePassword = (password) => {
    const passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (/\s/.test(password)) {
      passwordErrors.push("La contraseña no debe contener espacios.");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("La contraseña debe contener al menos una letra mayúscula.");
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push("La contraseña debe contener al menos un número.");
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      passwordErrors.push("La contraseña solo puede contener letras y números.");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordErrors
    }));
  };

  const checkPasswordMatch = (password, confirmarContraseña) => {
    if (password !== confirmarContraseña) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: "Las contraseñas no coinciden."
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    try {
      const response = await axios.post('http://localhost:3001/auth/register', userData);
      alert('Usuario registrado exitosamente'); // Agregamos el alert aquí
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmarContraseña: '',
        role: 'user'
      });
      setErrors({
        password: [],
        passwordMatch: ''
      });
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage('Error al registrar el usuario: ' + error.response.data.message);
      } else {
        setMessage('Error de conexión al servidor');
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.password === formData.confirmarContraseña &&
      errors.password.length === 0 &&
      formData.username.trim() !== '' &&
      formData.email.trim() !== '' &&
      /\S+@\S+\.\S+/.test(formData.email)
    );
  };

  return (
    <div className="register-container">
      <div className="App-box">
        <h1>REGISTRARSE</h1>
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password.length > 0 && (
            <div style={{ color: 'red' }}>
              {errors.password.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
          <input
            id="confirmarContraseña"
            type="password"
            name="confirmarContraseña"
            placeholder="Confirmar contraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
          />
          {errors.passwordMatch && (
            <div style={{ color: 'red' }}>
              <p>{errors.passwordMatch}</p>
            </div>
          )}
          <button type="submit" disabled={!isFormValid()}>REGISTRARSE</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;