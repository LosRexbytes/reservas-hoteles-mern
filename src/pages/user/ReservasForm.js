import React, { useState, useEffect } from 'react';
import './ReservasForm.css'; // Importa el archivo de estilos

const ReservasForm = () => {
  // Estado para almacenar los valores del formulario
  const [destino, setDestino] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [huespedes, setHuespedes] = useState(1);
  const [hoteles, setHoteles] = useState([]);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);

  // Simula la obtención de las fechas disponibles para una habitación simple
  useEffect(() => {
    // Aquí puedes hacer una llamada a una API para obtener las fechas reales desde el backend
    const fechas = [
      '2024-10-25',
      '2024-10-26',
      '2024-11-01',
      '2024-11-02',
      // Añadir más fechas si es necesario
    ];
    setFechasDisponibles(fechas);
  }, []);

  // Maneja la búsqueda de alojamientos
  const handleBuscar = (e) => {
    e.preventDefault();
    
    // Simular búsqueda de hoteles (esto podría ser una llamada a una API en la vida real)
    const resultados = [
      { id: 1, nombre: 'Cuarto Ejemplo', precio: 120, descripcion: 'Excelente ubicación y baño privado.' },
      { id: 2, nombre: 'Cuarto Ejemplo 2', precio: 150, descripcion: 'Gran vista y comodidades.' },
      { id: 3, nombre: 'Cuarto Ejemplo 3', precio: 180, descripcion: 'Acceso a servicios exclusivos.' }
    ];

    setHoteles(resultados);
  };

  // Maneja la reserva de una habitación
  const handleReservar = (hotelId) => {
    alert(`Has reservado una habitación en el hotel con ID: ${hotelId}`);
  };

  return (
    <div className="container">
      {/* Encabezado de la página */}
      <header className="header">
      <h1>Risueños </h1>
      
      
      </header>
      
      {/* Formulario de búsqueda de alojamientos */}
      <form className="search-form" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Tipo"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha de entrada"
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
          list="fechas-disponibles" // Para mostrar las fechas disponibles
        />
        <datalist id="fechas-disponibles">
          {fechasDisponibles.map((fecha) => (
            <option key={fecha} value={fecha} />
          ))}
        </datalist>
        <input
          type="date"
          placeholder="Fecha de salida"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
        />
        <input
          type="number"
          placeholder="Huéspedes"
          value={huespedes}
          onChange={(e) => setHuespedes(e.target.value)}
          min="1"
        />
        <button type="submit">Buscar</button>
      </form>
      
      {/* Título de hoteles disponibles */}
      <h2 className="hotels-title">Cuartos Disponibles</h2>

      {/* Contenedor de las tarjetas de alojamientos */}
      <div className="hotels-container">
        {hoteles.length === 0 ? (
          <p>No se encontraron hoteles para los criterios seleccionados.</p>
        ) : (
          hoteles.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <div
                className="hotel-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
              ></div>
              <div className="hotel-info">
                <h3>{hotel.nombre}</h3>
                <p>{hotel.descripcion}</p>
                <p className="price">Desde ${hotel.precio}/noche</p>
                <button onClick={() => handleReservar(hotel.id)}>Reservar ahora</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pie de página */}
      <footer>
        © 2024 Reservas Hoteleras. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ReservasForm;
