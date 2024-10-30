import React from 'react';
import { useNavigate } from 'react-router-dom';
import matrimonial from './assets/matrimonial.jpg';
import hotelLogo from './assets/hotelLogo.jpeg';
import './Habitaciones.css';

const HabitacionMatrimonial = () => {
  const navigate = useNavigate(); 

  const handleVolver = () => {
    navigate(-1); 
  };

  const handleReservarAhora = () => {
    navigate('/reservaAceptada'); 
  };

  return (
    <div className="container">
      <header className="headerH">
        <img src={hotelLogo} alt="Hotel Risueños" className="logo" />
      </header>

      <div className="bannerH">
        <img src={matrimonial} alt="Habitación Matrimonial Deluxe con vista al valle" className="room-banner" />
      </div>

      <div className="content">
        <h2>Habitación Matrimonial Deluxe con vista al valle</h2>
        <p className="subtitle">LA ELECCIÓN PARA PAREJA</p>
        <p className="description">
          Disfrute de una estadía romántica con vistas increíbles al valle. Perfecta para parejas.
          Esta habitación tiene una cama grande, baño privado con ducha Española y grandes ventanales.
          Esta habitación tiene un amplio balcón amoblado, perfecto para tomar el desayuno o cena rodeado de la naturaleza.
          Precio: $180 por noche.
        </p>
        
        <div className="details">
          <div className="section">
            <h3>Capacidad</h3>
            <p>2 Adultos & 0 Niños</p>
            <h3>Precio</h3>
            <p>$180 por noche.</p>
          </div>
          <div className="section">
            <h3>Comodidades</h3>
            <div className="comodidades">
              <div>
                <h4>Cuarto</h4>
                <ul>
                  <li>Wifi</li>
                  <li>Ropa de cama</li>
                  <li>Minibar</li>
                  <li>Balcón</li>
                  <li>Zona de estar</li>
                </ul>
              </div>
              <div>
                <h4>Baño</h4>
                <ul>
                  <li>Baño en la habitación</li>
                  <li>Secador de pelo</li>
                  <li>Ducha</li>
                  <li>Artículos de aseo gratis</li>
                  <li>Toallas</li>
                  <li>Papel higiénico</li>
                </ul>
              </div>
              <div>
                <h4>General</h4>
                <ul>
                  <li>Restaurante</li>
                  <li>Bar</li>
                  <li>Desayuno en la habitación</li>
                  <li>Cafetería en el alojamiento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <button className="button" onClick={handleVolver}>VOLVER</button>
        <button className="button primary" onClick={handleReservarAhora}>RESERVAR AHORA</button>
      </footer>
    </div>
  );
};

export default HabitacionMatrimonial;