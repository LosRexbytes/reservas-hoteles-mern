import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección
import { useAuth } from '../../context/AuthContext'; // Importar el contexto de autenticación

const LoginForm = () => {

  
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0); // Contador de intentos fallidos
  const [isLocked, setIsLocked] = useState(false); // Bandera para saber si está bloqueado
  const [lockTime, setLockTime] = useState(null); // Hora de bloqueo

  const navigate = useNavigate(); // Inicializar el hook para navegación
  const { setAuthData } = useAuth(); // Obtener la función para establecer datos de autenticación

  const MAX_FAILED_ATTEMPTS = 5; // Límite de intentos fallidos
  const LOCK_DURATION = 5 * 60 * 1000; // Duración del bloqueo en milisegundos (5 minutos)

  // Función que maneja el login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      const remainingTime = lockTime - Date.now();
      if (remainingTime > 0) {
        setErrorMessage(
          `Demasiados intentos fallidos. Por favor, inténtalo de nuevo en ${Math.ceil(remainingTime / 1000)} segundos.`
        );
        return;
      } else {
        setIsLocked(false); // Desbloquear después de la duración
        setFailedAttempts(0); // Restablecer contador de intentos fallidos
        setLockTime(null); // Limpiar la hora de bloqueo
      }
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { 
      //const response = await axios.post('https://backend-reservas-mern.onrender.com/auth/login', {
        usernameEmail,
        password,
      });

      setSuccessMessage(`Bienvenido ${response.data.username}`);
      setErrorMessage('');

      // Guardar datos de autenticación en el contexto
      setAuthData({ 
        isAuthenticated: true, 
        role: response.data.role, 
        username: response.data.username,
        email: response.data.email  // Agregar esta línea para incluir el email
      });

      // Redirigir según el rol
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard'); // Redirigir a Admin Dashboard
      } else {
        navigate('/buscar-hab'); // Redirigir a la página de Bienvenida
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error desconocido');
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor');
      } else {
        setErrorMessage('Error al configurar la solicitud: ' + error.message);
      }

      // Incrementar el contador de intentos fallidos
      setFailedAttempts((prevAttempts) => {
        const newAttempts = prevAttempts + 1;
        if (newAttempts >= MAX_FAILED_ATTEMPTS) {
          setIsLocked(true);
          setLockTime(Date.now() + LOCK_DURATION); // Establecer la hora de bloqueo
          setErrorMessage('Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde.');
        }
        return newAttempts;
      });

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

  // Redirigir o mostrar mensaje de bloqueo si está bloqueado
  useEffect(() => {
    if (isLocked) {
      const remainingTime = lockTime - Date.now();
      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0); // Resetear intentos fallidos al desbloquear
          setLockTime(null);
          setErrorMessage('');
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, [isLocked, lockTime]);

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
            disabled={isLocked} // Deshabilitar el formulario si está bloqueado
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLocked} // Deshabilitar el formulario si está bloqueado
          />
          <button disabled={isLocked}>LOGIN</button>
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
