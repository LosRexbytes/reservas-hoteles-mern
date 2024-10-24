import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación

const LoginForm = () => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Inicializar el hook para navegación
  const { setAuthData } = useAuth(); // Obtener la función para establecer datos de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        usernameEmail,
        password,
      });

      setSuccessMessage(`Bienvenido ${response.data.username}`);
      setErrorMessage('');

      // Guardar datos de autenticación en el contexto
      setAuthData({ isAuthenticated: true, role: response.data.role, username: response.data.username });

      // Redirigir según el rol
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard'); // Redirigir a Admin Dashboard
      } else {
        navigate('/bienvenida'); // Redirigir a la página de Bienvenida
      }
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
    navigate('/register');
  };

  return (
    <div className="App-container">
      <div className="App-box">
        <h1>Portal de Ingreso</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-email">Username o Email:</label>
          <input
            id="username-email"
            type="text"
            placeholder="Username o Email"
            value={usernameEmail}
            onChange={(e) => setUsernameEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
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
            <label onClick={handleForgotPassword}>¿Olvidaste tu contraseña?, Recuperar</label>
            <label onClick={handleForgoRegister}>¿No tienes cuenta?, REGISTRARSE</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

