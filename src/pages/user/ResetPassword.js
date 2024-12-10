import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    setRequirements({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    if (
      !requirements.minLength ||
      !requirements.uppercase ||
      !requirements.number ||
      !requirements.specialChar
    ) {
      alert("La contraseña no cumple con los requisitos mínimos.");
      return;
    }

    try {
      await axios.post(
        `https://backend-reservas-mern.onrender.com/auth/reset-password/${token}`,
        { newPassword }
      );
      setMessage("Contraseña actualizada exitosamente.");
    } catch (error) {
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="header-container">
          <h1 className="header">Restablecer Contraseña de Cuenta</h1>
        </div>
        <p className="subheader">
          Por favor, ingresa una nueva contraseña para tu cuenta en RISUEÑOS.
        </p>

        <form id="resetForm" onSubmit={handleSubmit}>
          <input
            type="password"
            id="newPassword"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Actualizar Contraseña</button>
        </form>

        <div className="requirements">
          <p>La contraseña debe tener al menos:</p>
          {!requirements.minLength && <p>- 8 caracteres.</p>}
          {!requirements.uppercase && <p>- Una letra mayúscula.</p>}
          {!requirements.number && <p>- Un número.</p>}
          {!requirements.specialChar && <p>- Un carácter especial (por ejemplo, @, #, $, %).</p>}
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
