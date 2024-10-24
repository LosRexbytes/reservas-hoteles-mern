import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';        
import RegisterForm from './pages/RegisterForm';  
import PasswordReset from './pages/PasswordReset'; 
import VerificationCode from './pages/VerificationCode'; 
import ReservasForm from './pages/ReservasForm'; 
import AdminDashboard from './pages/AdminDashboard'; 
import Bienvenida from './pages/Bienvenida'; 
import Habitaciones from './pages/Habitaciones';
import Buscarhabitaciones from './pages/Buscarhabitaciones';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/reservas-form" element={<ReservasForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/verify-code" element={<VerificationCode />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Asegúrate que esta ruta sea correcta */}
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/buscar-habitaciones" element={<Buscarhabitaciones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
