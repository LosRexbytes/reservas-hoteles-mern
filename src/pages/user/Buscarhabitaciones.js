import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticación
import hotelLogo from './assets/hotelLogo.jpeg';
import jacuzziRoom from './assets/jacuzziRoom.jpg';
import matrimonialRoom from './assets/matrimonialRoom.jpg';
import simpleRoom from './assets/simpleRoom.jpg';
import doubleRoom from './assets/doubleRoom.jpg';
import './Buscarhabitaciones.css';

const Buscarhabitaciones = () => {
  
  const navigate = useNavigate();
  const { authData } = useAuth(); // Acceso al contexto de autenticación

  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [roomCount, setRoomCount] = useState(1); // Número de habitaciones
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  //console.log(authData); // Verifica qué contiene el objeto authData
  const username = authData?.username;
  const email = authData?.email;

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

  // Funciones para navegar
  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handlehabitacionlujo = () => navigate('/lujo');
  const handleVolver = () => navigate(-1);
  const handleVERHAB = () => navigate('/ver-hab');

  // Funciones de manejo de inputs
  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const handleRoomCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRoomCount(isNaN(value) ? 1 : Math.max(1, Math.min(5, value))); // Rango 1-5
  };

  const handleRoomCountBlur = () => {
    if (roomCount < 1) setRoomCount(1);
    if (roomCount > 5) setRoomCount(5);
  };

  const handleCheckInChange = (e) => {
    const today = new Date().toISOString().split('T')[0];
    const value = e.target.value;
    if (value < today) {
      setCheckInDate(today); // No permite fechas anteriores a hoy
    } else {
      setCheckInDate(value);
      // Ajusta el checkout si es necesario
      if (checkOutDate && new Date(value) >= new Date(checkOutDate)) {
        const nextDay = new Date(value);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOutDate(nextDay.toISOString().split('T')[0]);
      }
    }
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    const minCheckout = new Date(checkInDate);
    minCheckout.setDate(minCheckout.getDate() + 1); // Mínimo 1 día después del check-in

    const maxCheckout = new Date(checkInDate);
    maxCheckout.setMonth(maxCheckout.getMonth() + 1); // Máximo 1 mes después del check-in

    if (new Date(value) < minCheckout) {
      setCheckOutDate(minCheckout.toISOString().split('T')[0]);
    } else if (new Date(value) > maxCheckout) {
      setCheckOutDate(maxCheckout.toISOString().split('T')[0]);
    } else {
      setCheckOutDate(value);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Fecha actual

  // Función para manejar el logout (deberás implementarla para limpiar el estado de username)
  const handleLogout = () => {
    setUsername(''); // Limpia el estado de username cuando el usuario cierra sesión
  };

  return (
    <div className="buscarhabitaciones">
      <header className="headerBH">
        <img src={hotelLogo} alt="Hotel Logo" className="hotel-logo" />
        <h1>Descansa bajo las estrellas de los Andes!</h1>
          <nav>
            {username ? (
              <>
                <p className="welcome-text">{username}</p>
                <button onClick={() => navigate('/ver-perfil')} className="auth-button">Ver perfil</button>
                </>

            ) : (
              <div className="auth-buttons-container">
                <button onClick={() => navigate('/login')} className="auth-button">Iniciar sesión</button>
                <button onClick={() => navigate('/register')} className="auth-button">Registrarse</button>
              </div>
            )}
          </nav>
      </header>

      <section className="bannerBH">
        <h1>Reserva de Habitación</h1>
      </section>

      <section className="reservation-form">
        <div>
          <label>Check-In:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={handleCheckInChange}
            min={today}
          />
        </div>
        <div>
          <label>Check-Out:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={handleCheckOutChange}
            min={checkInDate ? new Date(checkInDate).toISOString().split('T')[0] : today}
            max={checkInDate ? new Date(new Date(checkInDate).setMonth(new Date(checkInDate).getMonth() + 1)).toISOString().split('T')[0] : ''}
          />
        </div>
        <div>
          <label>Número de Habitaciones:</label>
          <input
            type="number"
            value={roomCount}
            onChange={handleRoomCountChange}
            onBlur={handleRoomCountBlur}
            min="1"
            max="5"
          />
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
        <button className="button" onClick={() => navigate('/historial-habitaciones')}>HISTORIAL DE RESERVAS</button>
      </footer>
    </div>
  );
};

export default Buscarhabitaciones;
