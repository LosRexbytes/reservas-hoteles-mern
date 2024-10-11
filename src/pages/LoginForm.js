import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        usernameEmail,
        password,
      });
      setSuccessMessage(`Bienvenido ${response.data.username}`);
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        // Error en el servidor (400, 500, etc.)
        setErrorMessage(error.response.data.message);
      } else {
        // Otro tipo de error
        setErrorMessage('Error de conexión con el servidor');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="App-container">
      <div className="App-box">
        <h1>Portal de Ingreso</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username o Email"
            value={usernameEmail}
            onChange={(e) => setUsernameEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOGIN</button>
          <div className="extras">
            <label>
              <input type="checkbox" /> Guardar
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
