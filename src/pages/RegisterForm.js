import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import './RegisterForm.css';

const App = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: [],
    passwordMatch: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }

    if (e.target.name === 'confirmPassword') {
      checkPasswordMatch(formData.password, e.target.value);
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

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
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
    if (errors.password.length === 0 && errors.passwordMatch === '') {
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        console.log(response.data); // Manejo de respuesta exitosa
      } catch (error) {
        console.error('Error al enviar el formulario:', error.response.data);
      }
    }
  };

  return (
    <div className="App-container">
      <div className="App-box">
        <h1>REGISTRARSE</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
          />
          <input
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.passwordMatch && (
            <div style={{ color: 'red' }}>
              <p>{errors.passwordMatch}</p>
            </div>
          )}
          <button type="submit">REGISTRARSE</button>
        </form>
      </div>
    </div>
  );
};

export default App;
