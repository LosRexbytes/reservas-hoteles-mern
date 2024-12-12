// VerPerfil.js
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de importar el hook de contexto
import './verPerfil.css';

const VerPerfil = () => {

  const { authData } = useAuth(); // Accede al estado global

  const username = authData?.username;
  const email = authData?.email || 'example@gmail.com';   


  useEffect(() => {
    // Este efecto se puede usar para realizar tareas adicionales si es necesario
    // Por ejemplo, llamar a una API para obtener los detalles del usuario
  }, []);

  return (
    <div className="perfil-container">
      <h1>Perfil de Usuario</h1>
      <p>Bienvenido al perfil de {username}</p>
      <p>Correo electrónico: {email}</p>
      {/* Aquí puedes agregar más información sobre el perfil */}
    </div>
  );
};

export default VerPerfil;
