import React, { useState, useEffect } from 'react';
import habSimple from './assets/habSimples.jpg';
import habDoble from './assets/habDobles.jpg';
import habMatrimonial from './assets/habMatrimonial.jpg';
import { useNavigate } from 'react-router-dom'; 
import './Bienvenida.css';

const Bienvenida = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('');
  
  const navigate = useNavigate();
  
  // Al iniciar, verifica si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus); // Actualiza el estado
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Check-In: ${checkInDate}, Check-Out: ${checkOutDate}, Guests: ${guests}`);
    
    // Redirige a la página de búsqueda de habitaciones
    navigate('/Buscar-habitaciones'); 
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: '/reservas' } }); // Guarda la ruta de destino
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleReservar = () => {
    // Redirige según el estado de autenticación
    if (!isAuthenticated) {
      // Si no está autenticado, redirige a login y guarda la ruta de retorno
      navigate('/login', { state: { from: '/reservas' } });
    } else {
      // Si está autenticado, redirige a la página de reservas
      navigate('/reservas');
    }
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
          <h2>Encuentra tu habitación ideal</h2>
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
            <img src={habSimple} alt="Habitación simple" />
            <h3>Habitación simple</h3>
            <p>Ubicado en el centro de la ciudad</p>
            <button onClick={handleReservar}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habDoble} alt="Habitación doble" />
            <h3>Habitación doble</h3>
            <p>Ideal para parejas o amigos</p>
            <button onClick={handleReservar}>Reservar Ahora</button>
          </div>

          <div className="hotel-card">
            <img src={habMatrimonial} alt="Habitación matrimonial" />
            <h3>Habitación matrimonial</h3>
            <p>El mejor servicio y comodidad</p>
            <button onClick={handleReservar}>Reservar Ahora</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bienvenida;
