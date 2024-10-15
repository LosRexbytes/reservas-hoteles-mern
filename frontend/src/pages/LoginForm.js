import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección

const LoginForm = () => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Inicializar el hook para navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        usernameEmail,
        password,
      });
      setSuccessMessage(`Bienvenido ${response.data.username}`);
      setErrorMessage('');

      // Redirigir a la página de reservas
      navigate('/reservas-form');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error desconocido');
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor');
      } else {
        setErrorMessage('Error al configurar la solicitud: ' + error.message);
      }
      setSuccessMessage('');
    }
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  const handleForgoRegister = () => {
    navigate('/register')
  }

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
            <label 
              className="/reset-password" 
              onClick={handleForgotPassword}> ¿Olvidaste tu contraseña?, Recuperar
            </label>
            <label 
              className="/register" 
              onClick={handleForgoRegister}> ¿No tienes cuenta?, REGISTRARSE
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
