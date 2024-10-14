import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';        // Ruta hacia el formulario de login
import RegisterForm from './pages/RegisterForm';  // Ruta hacia el formulario de registro
import PasswordReset from './pages/PasswordReset'; // Ruta hacia el formulario de restablecimiento de contraseña
import VerificationCode from './pages/VerificationCode'; // Ruta hacia el formulario de verificación de código
import ReservasForm from './pages/ReservasForm'; // Ruta hacia el formulario de reservas
import './App.css';  // Importa los estilos generales de la aplicación

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Ruta predeterminada ("/") que carga el formulario de login */}
          <Route path="/" element={
            <div className="container">
              <div className="login-section">
                <LoginForm /> {/* Carga el formulario de inicio de sesión */}
              </div>
            </div>
          } />

          {/* Ruta para el formulario de registro */}
          <Route path="/register" element={
            <div className="container">
              <div className="register-section">
                <RegisterForm /> {/* Carga el formulario de registro */}
              </div>
            </div>
          } />

          {/* Ruta para el formulario de restablecimiento de contraseña */}
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Ruta para el formulario de verificación de código */}
          <Route path="/verify-code" element={<VerificationCode />} />

          {/* Ruta para el formulario de reservas de hoteles */}
          <Route path="/reservas-form" element={
            <div className="container">
              <div className="reservas-section">
                <ReservasForm /> {/* Carga el formulario de reservas */}
              </div>
            </div>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

