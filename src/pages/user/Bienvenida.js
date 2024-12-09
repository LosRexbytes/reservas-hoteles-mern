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

  const handleBuscarhab = () => {
    navigate('/buscar-hab');
  }

  return (
    <div>
      <header className="header">
        <div className="title-container">
          <h1 className="main-title">Posada Risueños</h1>
          <h2 className="sub-title">Bienvenido a tu refugio Andino</h2>
        </div>
        <nav>
          <a href="/login" onClick={handleLogin}>Iniciar Sesión</a>
          <a href="/register" onClick={handleRegister}>Registro</a>
        </nav>
      </header>

      <div className="banner">
        <form className="search-box" onSubmit={handleSubmit}>
          <h2>Encuentra tu habitacion ideal</h2>
          
          <button onClick={handleBuscarhab}>Buscar</button>
        </form>
      </div>

      <main className="main-content">
        <h2>Explora nuestras opciones</h2>

        <div className="hotel-cards">
          <div className="hotel-card">
            <img src={habSimple} alt="Habitacion simple" />
            <h3>Habitación simple</h3>
            <p>Ubicado en el centro de la ciudad</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habDoble} alt="Habitacion doble" />
            <h3>Habitación doble</h3>
            <p>Ideal para parejas o amigos</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habMatrimonial} alt="Habitacion matrimonial" />
            <h3>Habitación matrimonial</h3>
            <p>El mejor servicio y comodidad</p>
            <button onClick={handleLogin}>Reservar Ahora</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bienvenida;