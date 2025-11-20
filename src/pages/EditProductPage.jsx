// src/pages/EditProductPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProductPage = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Guardamos la imagen para no perderla
  const [loading, setLoading] = useState(true);
  
  const apiUrl = 'https://68e96c50f1eeb3f856e3fed9.mockapi.io/products';

  // 1. Cargar los datos actuales del producto
  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description || '');
        setImage(data.image);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error al cargar el producto');
        navigate('/admin');
      });
  }, [id, navigate]);

  // 2. Manejar el guardado (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      name,
      price: Number(price),
      description,
      image // Mantenemos la misma imagen
    };

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT', // PUT es para actualizar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        toast.success('¡Producto actualizado!');
        navigate('/admin');
      } else {
        throw new Error('Error al actualizar');
      }
    } catch (error) {
      toast.error('No se pudo actualizar el producto');
    }
  };

  if (loading) return <p style={{color: 'white', textAlign: 'center'}}>Cargando datos...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', color: 'white' }}>
      <h1>Editar Producto</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Nombre</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Precio</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Descripción</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white', minHeight: '100px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            backgroundColor: '#ffc107',
            color: 'black', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;