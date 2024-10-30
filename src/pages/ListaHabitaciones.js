import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaHabitaciones.css'; // Importa el archivo CSS

const ListaHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/habitacions');
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al cargar las habitaciones');
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Habitaciones</h2>
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Habitación</th>
              <th>Precio por Noche</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion) => (
              <tr key={habitacion._id}>
                <td>{habitacion._id}</td>
                <td>{habitacion.room_type}</td>
                <td>{habitacion.price_per_night}</td>
                <td>{habitacion.availability ? 'Disponible' : 'No Disponible'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaHabitaciones;
