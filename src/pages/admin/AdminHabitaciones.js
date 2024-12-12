import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [formData, setFormData] = useState({
    tipoHabitacion: '',
    titulo: '',
    subtitulo: '',
    descripcion: '',
    precioPorNoche: '',
    capacidadAdultos: '',
    capacidadNinos: '',
    comodidadesCuarto: '',
    comodidadesBano: '',
    comodidadesGeneral: '',
    imagen: null,
    disponibilidad: 'disponible'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get('https://backend-reservas-mern.onrender.com/rooms');
      setHabitaciones(response.data);
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'imagen') {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      } else if (['comodidadesCuarto', 'comodidadesBano', 'comodidadesGeneral'].includes(key)) {
        const comodidades = formData[key].split(',').map(item => item.trim()).filter(item => item !== '');
        if (comodidades.length > 7) {
          alert(`Las ${key} no pueden tener más de 7 elementos.`);
          return;
        }
        formDataToSend.append(key, JSON.stringify(comodidades));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      if (editingId) {
        await axios.put(`https://backend-reservas-mern.onrender.com/rooms/${editingId}`, formDataToSend);
      } else {
        await axios.post('https://backend-reservas-mern.onrender.com/rooms', formDataToSend);
      }
      fetchHabitaciones();
      resetForm();
    } catch (error) {
      console.error('Error al guardar habitación:', error);
      alert('Hubo un error al guardar la habitación. Por favor, intenta de nuevo.');
    }
  };

  const handleEdit = (habitacion) => {
    setFormData({
      tipoHabitacion: habitacion.tipoHabitacion,
      titulo: habitacion.titulo,
      subtitulo: habitacion.subtitulo,
      descripcion: habitacion.descripcion,
      precioPorNoche: habitacion.precioPorNoche,
      capacidadAdultos: habitacion.capacidad.adultos,
      capacidadNinos: habitacion.capacidad.ninos,
      comodidadesCuarto: habitacion.comodidadesCuarto.join(','),
      comodidadesBano: habitacion.comodidadesBano.join(','),
      comodidadesGeneral: habitacion.comodidadesGeneral.join(','),
      imagen: null,
      disponibilidad: habitacion.disponibilidad
    });
    setEditingId(habitacion._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
      try {
        await axios.delete(`https://backend-reservas-mern.onrender.com/rooms/${id}`);
        fetchHabitaciones();
      } catch (error) {
        console.error('Error al eliminar habitación:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      tipoHabitacion: '',
      titulo: '',
      subtitulo: '',
      descripcion: '',
      precioPorNoche: '',
      capacidadAdultos: '',
      capacidadNinos: '',
      comodidadesCuarto: '',
      comodidadesBano: '',
      comodidadesGeneral: '',
      imagen: null,
      disponibilidad: 'disponible'
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-4 bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Administrar Habitaciones</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="tipoHabitacion"
            value={formData.tipoHabitacion}
            onChange={handleInputChange}
            placeholder="Tipo de Habitación"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            placeholder="Título"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="subtitulo"
            value={formData.subtitulo}
            onChange={handleInputChange}
            placeholder="Subtítulo"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="precioPorNoche"
            value={formData.precioPorNoche}
            onChange={handleInputChange}
            placeholder="Precio por Noche"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="capacidadAdultos"
            value={formData.capacidadAdultos}
            onChange={handleInputChange}
            placeholder="Capacidad Adultos"
            className="border p-2 rounded"
            min="1"
            max="4"
            required
          />
          <input
            type="number"
            name="capacidadNinos"
            value={formData.capacidadNinos}
            onChange={handleInputChange}
            placeholder="Capacidad Niños"
            className="border p-2 rounded"
            min="0"
            max="4"
            required
          />
          <input
            type="text"
            name="comodidadesCuarto"
            value={formData.comodidadesCuarto}
            onChange={handleInputChange}
            placeholder="Comodidades Cuarto (máx. 7, separadas por coma)"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="comodidadesBano"
            value={formData.comodidadesBano}
            onChange={handleInputChange}
            placeholder="Comodidades Baño (máx. 7, separadas por coma)"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="comodidadesGeneral"
            value={formData.comodidadesGeneral}
            onChange={handleInputChange}
            placeholder="Comodidades General (máx. 7, separadas por coma)"
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="imagen"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          <select
            name="disponibilidad"
            value={formData.disponibilidad}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            {editingId ? 'Actualizar Habitación' : 'Agregar Habitación'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habitaciones.map((habitacion) => (
          <div key={habitacion._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-green-700 mb-2">{habitacion.titulo}</h2>
            <p className="text-gray-600 mb-2">{habitacion.subtitulo}</p>
            <p className="mb-1"><span className="font-semibold">Tipo:</span> {habitacion.tipoHabitacion}</p>
            <p className="mb-1"><span className="font-semibold">Precio:</span> ${habitacion.precioPorNoche}/noche</p>
            <p className="mb-1"><span className="font-semibold">Capacidad:</span> {habitacion.capacidad.adultos} adultos, {habitacion.capacidad.ninos} niños</p>
            <p className="mb-2"><span className="font-semibold">Disponibilidad:</span> {habitacion.disponibilidad}</p>
            <img 
              src={`https://backend-reservas-mern.onrender.com${habitacion.imagen}`} 
              alt={habitacion.titulo} 
              className="w-full h-48 object-cover rounded mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => handleEdit(habitacion)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button onClick={() => handleDelete(habitacion._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHabitaciones;

