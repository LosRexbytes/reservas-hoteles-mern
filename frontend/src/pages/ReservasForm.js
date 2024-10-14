import React from 'react';
import './ReservasForm.css'; // Importa el archivo de estilos

const ReservasForm = () => {
  return (
    <div className="container">
      {/* Encabezado de la página */}
      <header className="header">
        <h2>Encuentra tu Alojamiento Ideal</h2>
        <p>Reserva tu estancia perfecta en los mejores destinos.</p>
      </header>
      
      {/* Formulario de búsqueda de alojamientos */}
      <div className="search-form">
        <input type="text" placeholder="Destino" />
        <input type="date" placeholder="Fecha de entrada" />
        <input type="date" placeholder="Fecha de salida" />
        <input type="number" placeholder="Huéspedes" min="1" />
        <button>Buscar</button>
      </div>
      
    
      {/* Título de hoteles disponibles */}
      <h2 className="hotels-title">Hoteles Disponibles</h2>

      {/* Contenedor de las tarjetas de alojamientos */}
      <div className="hotels-container">
        <div className="hotel-card">
          <div
            className="hotel-image"
            style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
          ></div>
          <div className="hotel-info">
            <h3>Hotel Ejemplo</h3>
            <p>Descripción breve del hotel. Excelente ubicación y servicios.</p>
            <p className="price">Desde $120/noche</p>
            <button>Reservar ahora</button>
          </div>
        </div>

        {/* Añade más tarjetas aquí */}
        <div className="hotel-card">
          <div
            className="hotel-image"
            style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
          ></div>
          <div className="hotel-info">
            <h3>Hotel Ejemplo 2</h3>
            <p>Descripción breve del hotel. Gran vista y comodidades.</p>
            <p className="price">Desde $150/noche</p>
            <button>Reservar ahora</button>
          </div>
        </div>

        {/* Más hoteles */}
        <div className="hotel-card">
          <div
            className="hotel-image"
            style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
          ></div>
          <div className="hotel-info">
            <h3>Hotel Ejemplo 3</h3>
            <p>Descripción breve del hotel. Acceso a servicios exclusivos.</p>
            <p className="price">Desde $180/noche</p>
            <button>Reservar ahora</button>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <footer>
        © 2024 Reservas Hoteleras. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ReservasForm;
