import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Habitaciones.css'; // Asegúrate de que este archivo CSS exista

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');

  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/habitacions');
      console.log(response.data); // Inspecciona lo que devuelve la respuesta
      setHabitaciones(response.data);
    } catch (err) {
      console.error('Error:', err.response); // Imprime detalles del error
      setError('Error al cargar las habitaciones');
    }
  };
  

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('es-PE');
  };

  return (
    <div className="habitaciones-container">
      <h2>Lista de Habitaciones</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="habitaciones-table">
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
              <td>{formatDate(habitacion.fechaEntrada)}</td>
              <td>{formatDate(habitacion.fechaSalida)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Habitaciones;
