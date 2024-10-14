import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import PasswordReset from './pages/PasswordReset';
import VerificationCode from './pages/VerificationCode';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta predeterminada ("/") que redirige a "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Ruta para el formulario de login */}
          <Route path="/login" element={
            <div className="container">
              <div className="login-section">
                <LoginForm />
              </div>
            </div>
          } />

          {/* Ruta para el formulario de registro */}
          <Route path="/register" element={
            <div className="container">
              <div className="register-section">
                <RegisterForm />
              </div>
            </div>
          } />

          {/* Otras rutas */}
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/verify-code" element={<VerificationCode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
