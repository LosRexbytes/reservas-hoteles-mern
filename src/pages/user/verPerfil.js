import React from 'react'; // Cambiar useEffect por React
import { useAuth } from '../../context/AuthContext';
import './verPerfil.css';

const VerPerfil = () => {
  const { authData } = useAuth();

  // Si no hay datos de autenticación, muestra un mensaje
  if (!authData || !authData.isAuthenticated) {
    return (
      <div className="perfil-container">
        <h1>Acceso Denegado</h1>
        <p>Por favor, inicie sesión para ver su perfil</p>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <h1>Perfil de Usuario</h1>
      <div className="perfil-info">
        <p><strong>Nombre de Usuario:</strong> {authData.username}</p>
        <p><strong>Correo Electrónico:</strong> {authData.email}</p>
        <p><strong>Rol:</strong> {authData.role}</p>
      </div>
    </div>
  );
};

export default VerPerfil;