import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navegación entre rutas
import lujoJacuzzi from './assets/habitacionLujoJacuzzy.jpg';
import dobleDeluxe from './assets/dobleDeluxe.jpg';
import dobleEstandar from './assets/dobleEstandar.jpg';
import matrimonialJacuzzi from './assets/matrimonialJacuzzy.jpg';
import matrimonial from './assets/matrimonial.jpg';
import vistasUnicas from './assets/vistasUnicas.jpg';
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticación

import './VERHAB.css';

const VERHAB= () => {

  const navigate = useNavigate(); // Navegación
  const { authData } = useAuth(); // Acceso al contexto de autenticación
  const username = authData?.username;
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleHablujo = () => {
    navigate('/lujo')
  }

  const handleHabmatrimonialdelux = () => {
    navigate('/matrimonial')
  }

  return (
    <div>
      {/* Sección del encabezado */}
      <header className="header">
        <h1>Risueños - Reserva de Habitación</h1>
          <nav>
                {username ? (
                <>
                
                <p className="welcome-text">{username}</p>
                <button onClick={() => navigate('/ver-perfil')} className="auth-button">Ver perfil</button>
                </>

                ) : (
                  <div className="auth-buttons-container">
                    <button onClick={() => navigate('/login')} className="auth-button">Iniciar sesión</button>
                    <button onClick={() => navigate('/register')} className="auth-button">Registrarse</button>
                  </div>
                )}
              </nav>
      </header>

      {/* Imagen de vistas únicas */}
      <section className="banner">
        <img src={vistasUnicas} alt="Vistas Únicas" className="banner-image" />
      </section>

      

      {/* Sección de habitaciones */}
      <main className="main-content">
        <h2>VISTAS ÚNICAS</h2>
        <p>HOTEL CERCA A MACHU PICCHU</p>
        <p>El hotel Risueños le espera con cinco hermosas habitaciones, cada una con un diseño diferente y único, y amplias zonas de estar.</p>
        <h2>Habitaciones con vistas al valle</h2>

        <div className="hotel-cards">
          <div className="hotel-card">
            <img src={lujoJacuzzi} alt="Habitación de lujo con Jacuzzi" />
            <h3>Habitación de lujo con Jacuzzi</h3>
            <button onClick={handleHablujo}>BUSCAR</button>
          </div>

          <div className="hotel-card">
            <img src={matrimonial} alt="Habitación Matrimonial Deluxe con vista al valle" />
            <h3>Habitación Matrimonial Deluxe con vista al valle</h3>
            <button onClick={handleHabmatrimonialdelux}>BUSCAR</button>
          </div>

          <div className="hotel-card">
            <img src={matrimonialJacuzzi} alt="Habitación Matrimonial con Jacuzzi" />
            <h3>Habitación Matrimonial con Jacuzzi</h3>
            <button onClick={handleLogin}>BUSCAR</button>
          </div>

          <div className="hotel-card">
            <img src={dobleDeluxe} alt="Habitación doble Deluxe" />
            <h3>Habitación doble Deluxe</h3>
            <button onClick={handleLogin}>BUSCAR</button>
          </div>

          <div className="hotel-card">
            <img src={dobleEstandar} alt="Habitación Doble Estandar" />
            <h3>Habitación Doble Estandar</h3>
            <button onClick={handleLogin}>BUSCAR</button>
          </div>
        </div>
      </main>

      {/* Información de contacto */}
      <footer className="footer">
        <h3>Nuestro Contacto</h3>
        <p>Reservaciones: +51 990048449</p>
        <p>Correo Electrónico: risueños@gmail.com</p>
      </footer>
    </div>
  );
};

export default VERHAB;
