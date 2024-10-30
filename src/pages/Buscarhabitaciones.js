import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hotelLogo from './assets/hotelLogo.jpeg';
import jacuzziRoom from './assets/jacuzziRoom.jpg';
import matrimonialRoom from './assets/matrimonialRoom.jpg';
import simpleRoom from './assets/simpleRoom.jpg';
import doubleRoom from './assets/doubleRoom.jpg';
import './Buscarhabitaciones.css';

const Buscarhabitaciones = () => {
  const navigate = useNavigate();
  const [selectedRoomType, setSelectedRoomType] = useState('');

  // Datos de habitaciones según el tipo
  const roomTypes = {
    jacuzzi: [
      { id: 1, image: jacuzziRoom, description: 'Jacuzzi, Wi-Fi, Smart TV con Netflix, minibar', cost: '$120 por noche' },
      { id: 2, image: jacuzziRoom, description: 'Jacuzzi, vista al mar, Wi-Fi, desayuno incluido', cost: '$130 por noche' },
    ],
    matrimonial: [
      { id: 1, image: matrimonialRoom, description: 'Cama king-size, Wi-Fi, baño privado, TV con cable', cost: '$90 por noche' },
      { id: 2, image: matrimonialRoom, description: 'Cama queen-size, desayuno incluido, balcón con vista', cost: '$95 por noche' },
    ],
    simple: [
      { id: 1, image: simpleRoom, description: 'Wi-Fi gratuito, cama individual, baño compartido', cost: '$50 por noche' },
      { id: 2, image: simpleRoom, description: 'Escritorio, cama individual, baño privado', cost: '$55 por noche' },
    ],
    doble: [
      { id: 1, image: doubleRoom, description: 'Dos camas individuales, Wi-Fi, TV con cable', cost: '$70 por noche' },
      { id: 2, image: doubleRoom, description: 'Dos camas, balcón con vista, Wi-Fi, minibar', cost: '$75 por noche' },
    ],
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handlehabitacionlujo = () => navigate('/lujo');
  const handleVolver = () => {
    navigate(-1); 
  };
  const handleVERHAB = () => navigate('/ver-hab');

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  return (
    <div className="buscarhabitaciones">
      <header className="headerBH">
        <img src={hotelLogo} alt="Hotel Logo" className="hotel-logo" />
        <h1>Bienvenidos al Hotel Risueños</h1>
        <nav>
          <a href="/login" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Iniciar Sesión</a>
          <a href="/register" onClick={(e) => { e.preventDefault(); handleRegister(); }}>Registro</a>
        </nav>
      </header>

      <section className="bannerBH">
        <h1>Reserva de Habitación</h1>
      </section>

      <section className="reservation-form">
        <div>
          <label>Check-In:</label>
          <input type="date" />
        </div>
        <div>
          <label>Check-Out:</label>
          <input type="date" />
        </div>
        <div>
          <label>Número de Habitaciones:</label>
          <input type="number" min="1" max="5" />
        </div>
        <div>
          <label>Buscar Habitación:</label>
          <select onChange={handleRoomTypeChange}>
            <option value="">Seleccione una opción</option>
            <option value="jacuzzi">Habitación con Jacuzzi</option>
            <option value="matrimonial">Matrimonial</option>
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
          </select>
        </div>
      </section>

      <section className="room-list">
        {selectedRoomType && roomTypes[selectedRoomType].map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.description} className="room-image" />
            <div className="room-info">
              <h3>{`Habitación ${selectedRoomType.charAt(0).toUpperCase() + selectedRoomType.slice(1)} ${room.id}`}</h3>
              <p>{room.description}</p>
              <p className="room-cost">{room.cost}</p>
              <button onClick={handlehabitacionlujo}>Reservar</button>
            </div>
          </div>
        ))}
      </section>
      <footer className="footer">
        <button className="button" onClick={handleVolver}>VOLVER</button>
        <button className="button primary" onClick={handleVERHAB}>VER HABITACIONES</button>
      </footer>
    </div>
  );
};

export default Buscarhabitaciones;
