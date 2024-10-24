// VerificationCode.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerificationCode.css'; // Asegúrate de que este archivo CSS existe

function VerificationCode() {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sentCode = '123456';  // El código que se envió por correo
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (code === sentCode) {
      alert('Código correcto, redirigiendo a la pantalla para cambiar la contraseña');
      // Aquí deberías redirigir a una nueva ruta para cambiar la contraseña
      // navigate('/change-password');
    } else {
      setErrorMessage('El código ingresado es incorrecto');
    }
  };

  const handleResendCode = () => {
    alert('Código reenviado al correo');
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <img src="/check-icon.png" alt="Verificación" className="check-icon" />
        <h2>VERIFICA QUE ERES TÚ</h2>
        <p>Se ha detectado algo inusual en tu actividad. Por seguridad queremos verificar tu identidad.</p>
        <p>Se acaba de enviar un correo con un código de verificación de 6 dígitos</p>
        <input 
          type="text" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Escribe el código"
          maxLength="6"
          className="input-code"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="btn-confirm" onClick={handleConfirm}>SIGUIENTE</button>
        <button className="btn-back" onClick={() => navigate('/reset-password')}>ATRÁS</button>
        <a href="#" className="resend-link" onClick={handleResendCode}>Volver a enviar código</a>
      </div>
    </div>
  );
}

export default VerificationCode;