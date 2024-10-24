let isAuthenticated = false;

export const login = (email, password) => {
  // Implementar la lógica de inicio de sesión aquí.
  // Este es solo un ejemplo simulado.
  if (email === "admin@example.com" && password === "password") {
    isAuthenticated = true;
    return Promise.resolve(true);
  }
  return Promise.reject(new Error("Credenciales inválidas"));
};

export const logout = () => {
  // Implementar la lógica de cierre de sesión aquí.
  isAuthenticated = false;
  return Promise.resolve(true);
};

export const isLoggedIn = () => {
  return isAuthenticated;
};