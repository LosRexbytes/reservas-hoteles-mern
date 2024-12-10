import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css'; // Asegúrate de importar los estilos

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para navegar al login

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('https://backend-reservas-mern.onrender.com/auth/send-reset-link', { email });
      setMessage('Se ha enviado un correo con el enlace para restablecer la contraseña.');
    } catch (error) {
      setError('Hubo un error al enviar el correo. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Restablece tu contraseña</h2>
        <p>Ingresa tu correo electrónico y recibirás un mensaje con las instrucciones</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="reset-input"
            required
          />
          <button type="submit" className="reset-button">Enviar enlace</button>
        </form>
        {message && <p className="message">{message}</p>}
        {error && <p className="message error">{error}</p>}
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
