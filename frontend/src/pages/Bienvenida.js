import React, { useState } from 'react';
import habSimple from './assets/habSimples.jpg';
import habDoble from './assets/habDobles.jpg';
import habMatrimonial from './assets/habMatrimonial.jpg';
import { useNavigate } from 'react-router-dom'; // Añadido useNavigate
import './Bienvenida.css';

const Bienvenida = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('');
  
  const navigate = useNavigate(); // Definido aquí

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Check-In: ${checkInDate}, Check-Out: ${checkOutDate}, Guests: ${guests}`);
    // Aquí puedes hacer una petición al backend si necesitas procesar el formulario
  };

  const handleLogin = () => {
    // Redirección al formulario de inicio de sesión
    navigate('/login');
  };

  const handleRegister = () => {
    // Redirección al formulario de registro
    navigate('/register');
  };

  return (
    <div>
      <header className="header">
        <h1>Risueños - Reserva de Habitación</h1>
        <nav>
          <a href="/login" onClick={handleLogin}>Iniciar Sesión</a>
          <a href="/register" onClick={handleRegister}>Registro</a>
        </nav>
      </header>

      <div className="banner">
        <form className="search-box" onSubmit={handleSubmit}>
          <h2>Encuentra tu habitacion ideal</h2>
          <input
            type="date"
            placeholder="dd/mm/aaaa"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="dd/mm/aaaa"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="" disabled>Seleccionar Huéspedes</option>
            <option value="1">1 Huésped</option>
            <option value="2">2 Huéspedes</option>
            <option value="3">3 Huéspedes</option>
            <option value="4">4 Huéspedes</option>
          </select>
          <button type="submit">Buscar</button>
        </form>
      </div>

      <main className="main-content">
        <h2>Explora nuestras opciones de hoteles</h2>

        <div className="hotel-cards">
          <div className="hotel-card">
            <img src={habSimple} alt="Habitacion simple" />
            <h3>Habitacion simple</h3>
            <p>Ubicado en el centro de la ciudad</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habDoble} alt="Habitacion simple" />
            <h3>Habitacion simple</h3>
            <p>Ideal para parejas o amigos</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habMatrimonial} alt="Habitacion matrimonial" />
            <h3>Habitacion matrimonial</h3>
            <p>El mejor servicio y comodidad</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bienvenida;
