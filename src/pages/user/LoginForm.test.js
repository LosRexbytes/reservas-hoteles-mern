// src/pages/LoginForm.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthProvider } from '../../context/AuthContext';

// Test para verificar que el formulario de inicio de sesión se renderiza sin fallos
test('renders LoginForm without crashing', () => {
  // Renderiza el componente LoginForm envuelto en el contexto de autenticación y un router de memoria
  const { getByLabelText, getByRole } = render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>
  );

  // Verifica que el campo de entrada para "username o email" esté presente en el documento
  const emailInput = getByLabelText(/username o email/i);
  expect(emailInput).toBeInTheDocument();

  // Verifica que el campo de entrada para "password" esté presente en el documento
  const passwordInput = getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();

  // Verifica que el botón de envío "LOGIN" esté presente en el documento
  const submitButton = getByRole('button', { name: /login/i });
  expect(submitButton).toBeInTheDocument();
});

