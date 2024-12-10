import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/user/LoginForm';        // Ruta hacia el formulario de login
import RegisterForm from './pages/user/RegisterForm';  // Ruta hacia el formulario de registro
import PasswordReset from './pages/user/PasswordReset'; // Ruta hacia el formulario de restablecimiento de contraseña
import VerificationCode from './pages/user/VerificationCode'; // Ruta hacia el formulario de verificación de código
import ReservasForm from './pages/user/ReservasForm'; // Ruta hacia el formulario de reservas
import Bienvenida from './pages/user/Bienvenida';
import BuscarHabitaciones from './pages/user/Buscarhabitaciones';
import HabitacionLujo from './pages/user/HabitacionLujo';
import HabitacionMatrimonial from './pages/user/HabitacionMatrimonial';
import ReservaAceptada from './pages/user/ReservaAceptada';
import VERHAB from './pages/user/VERHAB';
import ADMINDASHBOARD from './pages/admin/AdminDashboard';
import './App.css';  // Importa los estilos generales de la aplicación
import Habitaciones from './pages/admin/Habitaciones';
import CLIENTESADMIN from './pages/admin/ListaClientes';

import HistorialReservas from './pages/user/HistorialReservas';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta predeterminada ("/") que carga la página de bienvenida */}
          <Route path="/" element={<Bienvenida />} />

          {/* Ruta para el formulario de inicio de sesión */}
          <Route path="/login" element={<LoginForm />} />

          {/* Ruta para el formulario de registro */}
          <Route path="/register" element={<RegisterForm />} />

          {/* Ruta para el formulario de restablecimiento de contraseña */}
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Ruta para el formulario de verificación de código */}
          <Route path="/verify-code" element={<VerificationCode />} />

          {/* Ruta para el formulario de reservas de hoteles */}
          <Route path="/reservas-form" element={<ReservasForm />} />

          {/* Ruta para el formulario de buscar habitaciones */}
          <Route path="/buscar-hab" element={<BuscarHabitaciones />} />

          {/* Ruta para el formulario de ver habitaciones */}
          <Route path="/ver-hab" element={<VERHAB />} />

          {/* Ruta para el formulario de ver historial de habitaciones */}
          <Route path="/historial-habitaciones" element={<HistorialReservas />} />

          {/* MAS Rutas */}
          <Route path="/lujo" element={<HabitacionLujo />} />
          <Route path="/matrimonial" element={<HabitacionMatrimonial />} />

          {/* Ruta para cer la reserva aceptada */}
          <Route path="/reservaAceptada" element={<ReservaAceptada />} />

          {/* Ruta para entrar al admin*/}
          <Route path="/admin-dashboard" element={<ADMINDASHBOARD />} />
          <Route path="/listaclientes" element={<CLIENTESADMIN />} />
          <Route path="/admin-habitaciones" element={<Habitaciones />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

