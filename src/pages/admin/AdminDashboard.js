// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './AdminDashboard.css';
import userIcon from './assets/user-icon.png';
import logo from './assets/LogoRisueños.jpeg'; // Importa la imagen del logo
import { logout } from '../../services/authService'; 
import 'react-calendar/dist/Calendar.css'; 
import bienvenid from './assets/bienvenid.jpg';

const AdminDashboard = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const habitacionesSimuladas = [
        { id: 1, nombre: 'Habitación Deluxe', disponible: true },
        { id: 2, nombre: 'Habitación Estándar', disponible: false },
      ];
      setHabitaciones(habitacionesSimuladas);
    };

    const fetchReservas = async () => {
      const reservasSimuladas = [
        { id: 1, habitacionId: 1, fecha: '2024-10-25' },
        { id: 2, habitacionId: 2, fecha: '2024-10-30' },
      ];
      setReservas(reservasSimuladas);
    };

    fetchHabitaciones();
    fetchReservas();
  }, []);

  const handleViewHabitaciones = () => {
    navigate('/habitaciones');
  };
  const handleViewClientes = () => {
    navigate('/listaclientes');
  };

  const handleLogout = () => {
    logout() 
      .then(() => {
        console.log('Sesión cerrada');
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    setIsDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.dropdown');
      const userInfo = document.querySelector('.user-info');
      if (dropdown && !dropdown.contains(event.target) && !userInfo.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        {/* Imagen del logo en la barra lateral */}
        <div className="logo-container">
          <img src={logo} alt="Logo Risueños" className="logo-image" />
        </div>

        <ul>
          <li onClick={handleViewHabitaciones}>Habitaciones</li>
          <li>Reservas</li>
          <li onClick={handleViewClientes}>Clientes</li>
          <li>Configuraciones</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="user-info" onClick={toggleDropdown}>
          <img src={userIcon} alt="Usuario" className="user-icon" />
          {isDropdownOpen && (
            <div className="dropdown">
              <p><strong>Usuario:</strong> admin@example.com</p>
              <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>

        <h1>Tablero del Administrador</h1>

        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Habitaciones</h3>
            <p>{habitaciones.length}</p>
          </div>
          <div className="stat-box">
            <h3>Habitaciones Disponibles</h3>
            <p>{habitaciones.filter(h => h.disponible).length}</p>
          </div>
          <div className="stat-box">
            <h3>Reservas Activas</h3>
            <p>{reservas.length}</p>
          </div>
        </div>

        <div className="calendar-container">
          <h2>Calendario de Reservas</h2>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
