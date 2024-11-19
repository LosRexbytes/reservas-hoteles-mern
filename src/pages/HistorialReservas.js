import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = "id_del_usuario"; // Reemplaza esto por el ID del usuario actual
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/historial-habitaciones/${userId}`);
        setReservas(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el historial de reservas');
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div>
      <h1>Historial de Reservas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reservas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tipo de Habitación</th>
              <th>Precio por Noche</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Precio Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.room_id?.room_type || 'No especificado'}</td>
                <td>{reserva.room_id?.price_per_night || 'No especificado'}</td>
                <td>{new Date(reserva.check_in_date).toLocaleDateString()}</td>
                <td>{new Date(reserva.check_out_date).toLocaleDateString()}</td>
                <td>{reserva.total_price}</td>
                <td>{reserva.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay reservas registradas</p>
      )}
    </div>
  );
};

export default HistorialReservas;
