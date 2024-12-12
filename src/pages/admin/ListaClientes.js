import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListaClientes.css';

const ListaClientes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para cargar usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/users'); 
      //const response = await axios.get('https://backend-reservas-mern.onrender.com/auth/users'); 
      setUsuarios(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar los usuarios:', err);
      setError('Error al cargar los usuarios');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    console.log("Eliminando usuario con ID:", id);  // Verificar el id
    try {
      await axios.delete(`http://localhost:3001/auth/delete/${id}`);
      //await axios.delete(`https://backend-reservas-mern.onrender.com/auth/delete/${id}`);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
    } catch (err) {
      console.error('Error al eliminar el usuario:', err);
      setError(err.response ? err.response.data.message : 'Error desconocido al eliminar el usuario');
    }
  };

  // Función para volver a la página anterior
  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <div className="containerC">
      {/* Banner */}
      <header className="bannerC">
        <h1>Risueños</h1>
      </header>

      <main className="contentC">
        <h2>Lista de Clientes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre de Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => eliminarUsuario(usuario._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Botón "Volver" */}
        <button onClick={handleVolver} className="back-button">
          Volver
        </button>
      </main>
    </div>
  );
};

export default ListaClientes;