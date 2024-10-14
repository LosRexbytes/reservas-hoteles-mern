import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';  // Asegúrate de crear un archivo CSS

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Para navegar al login

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/send-reset-link', { email });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error al enviar el enlace de recuperación.');
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <div className="reset-icon">
          <img src="/password_reset_lock.png" alt="Lock Icon" />
        </div>
        <h2>Restablece tu contraseña</h2>
        <p>Ingresa tu correo electrónico y recibirás un mensaje con las instrucciones</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="reset-input"
          />
          <button type="submit" className="reset-button">Continuar</button>
        </form>
        {message && <p className="message">{message}</p>}
        <div className="reset-footer">
          <button onClick={() => navigate('/')} className="back-button">Regresar al Login</button>
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
          <p>¿Ya tienes cuenta? <a href="/login">Ingresa ahora</a></p>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
