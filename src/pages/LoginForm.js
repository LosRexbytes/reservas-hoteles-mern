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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formato de correo antes de enviar la solicitud
    if (!validateEmail(usernameEmail)) {
      setErrorMessage('Correo inválido. Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Validar el formato de la contraseña
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(password);
    };

    if (!validatePassword(password)) {
      setErrorMessage('Contraseña inválida. Por favor, ingresa una contraseña válida.');
      return;
    }

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
        navigate('/buscar-hab'); // Redirigir a la página de Bienvenida
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverMessage = error.response.data.message;

        // Mostrar mensaje específico si el correo es inválido
        if (serverMessage.includes('Usuario no encontrado')) {
          setErrorMessage('Usuario no encontrado. Verifica tus credenciales e intenta de nuevo.');
        } 
        // Verificar si el mensaje del servidor se relaciona con la contraseña
        if (serverMessage.includes('Contraseña incorrecta')) {
          setErrorMessage('Contraseña inválida. Por favor, ingresa una contraseña válida.');
        } else {
          setErrorMessage(serverMessage || 'Error desconocido.');
        }
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor.');
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
  const handleLogin = () => navigate('/login');
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
          <button onClick={handleLogin}>LOGIN</button>
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

