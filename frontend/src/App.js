import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';        // Ruta hacia el formulario de login
import RegisterForm from './pages/RegisterForm';  // Ruta hacia el formulario de registro
import PasswordReset from './pages/PasswordReset'; // Ruta hacia el formulario de restablecimiento de contraseña
import VerificationCode from './pages/VerificationCode'; // Ruta hacia el formulario de verificación de código
import ReservasForm from './pages/ReservasForm'; // Ruta hacia el formulario de reservas
import Bienvenida from './pages/Bienvenida';
import './App.css';  // Importa los estilos generales de la aplicación

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

