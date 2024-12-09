import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import hotelLogo from './assets/hotelLogo.jpeg'; 
import './ReservaAceptada.css'; // Asegúrate de crear este archivo para los estilos

const ReservaAceptada = () => {
  const navigate = useNavigate(); 
  const handleVolver = () => {
    navigate(-1); 
  };

  return (
    <div className="reservation-container">
      <div className="text-section">
        <h1>SU RESERVA FUE REALIZADA CON ÉXITO</h1>
        <p>Gracias por reservar con HOTEL RISUEÑOS</p>
        <div className="button-sectionA"> {/* Sección para el botón */}
          <button className="button volver-button" onClick={handleVolver}>VOLVER</button>
          <button className="button" onClick={() => navigate('/historial-habitaciones')}>HISTORIAL DE RESERVAS</button>

        </div>
      </div>
      <div className="image-section">
        <img src={hotelLogo} alt="Logo del Hotel Risueños" /> {/* Usar la importación correcta */}
      </div>
    </div>
  );
};

export default ReservaAceptada;