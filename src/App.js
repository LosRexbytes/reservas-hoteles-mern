// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/user/LoginForm.js';        // Ruta hacia el formulario de login
import RegisterForm from './pages/user/RegisterForm.js';  // Ruta hacia el formulario de registro
import PasswordReset from './pages/user/PasswordReset.js'; // Ruta hacia el formulario de restablecimiento de contraseña
import ResetPassword from './pages/user/ResetPassword.js'; // Ruta hacia el formulario de restablecimiento de contraseña con token
import VerificationCode from './pages/user/VerificationCode.js'; // Ruta hacia el formulario de verificación de código
import ReservasForm from './pages/user/ReservasForm.js'; // Ruta hacia el formulario de reservas
import Bienvenida from './pages/user/Bienvenida.js';
import BuscarHabitaciones from './pages/user/Buscarhabitaciones.js';
import HabitacionLujo from './pages/user/HabitacionLujo.js';
import HabitacionMatrimonial from './pages/user/HabitacionMatrimonial.js';
import ReservaAceptada from './pages/user/ReservaAceptada.js';
import VERHAB from './pages/user/VERHAB.js';
import ADMINDASHBOARD from './pages/admin/AdminDashboard.js';
import './App.css';  // Importa los estilos generales de la aplicación
import AdminHabitaciones from './pages/admin/AdminHabitaciones.js';
import HistorialReservas from './pages/user/HistorialReservas.js';
import CLIENTESADMIN from './pages/admin/ListaClientes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta predeterminada ("/") que carga la página de bienvenida */}
          <Route path="/" element={<Bienvenida />} />

          {/* Ruta para el formulario de inicio de sesión */}
          <Route path="/login" element={<LoginForm />} />

          {/* Ruta para el formulario de restablecimiento de contraseña */}
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Ruta para el formulario de restablecimiento de contraseña con token */}
          <Route path="/password-reset/:token" element={<ResetPassword />} />

          {/* Otras rutas */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/verify-code" element={<VerificationCode />} />
          <Route path="/reservas-form" element={<ReservasForm />} />
          <Route path="/buscar-hab" element={<BuscarHabitaciones />} />
          <Route path="/ver-hab" element={<VERHAB />} />
          <Route path="/historial-habitaciones" element={<HistorialReservas />} />
          <Route path="/lujo" element={<HabitacionLujo />} />
          <Route path="/matrimonial" element={<HabitacionMatrimonial />} />
          <Route path="/reservaAceptada" element={<ReservaAceptada />} />
          <Route path="/admin-dashboard" element={<ADMINDASHBOARD />} />
          <Route path="/admin-habitaciones" element={<AdminHabitaciones />} />
          <Route path="/listaclientes" element={<CLIENTESADMIN />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
