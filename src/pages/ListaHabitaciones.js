//ListaHabitaciones.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/habitaciones');
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al cargar las habitaciones MONGOl');
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div>
      <h2>Lista de Habitaciones</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha de Entrada</th>
            <th>Fecha de Salida</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion) => (
            <tr key={habitacion._id}>
              <td>{habitacion._id}</td>
              <td>{habitacion.nombre}</td>
              <td>{habitacion.disponible ? 'Disponible' : 'No Disponible'}</td>
              <td>{habitacion.fechaEntrada ? new Date(habitacion.fechaEntrada).toLocaleDateString() : 'N/A'}</td>
              <td>{habitacion.fechaSalida ? new Date(habitacion.fechaSalida).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaHabitaciones;
