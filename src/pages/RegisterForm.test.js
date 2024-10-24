import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  test('renders RegisterForm without crashing', () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(getByLabelText(/correo/i)).toBeInTheDocument();
    expect(getByLabelText(/contraseña/i)).toBeInTheDocument(); 
    expect(getByLabelText(/confirmar contraseña/i)).toBeInTheDocument(); 
    expect(getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });
});
