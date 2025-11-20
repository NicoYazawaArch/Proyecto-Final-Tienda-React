// src/pages/CreateProductPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProductPage = () => {
  const navigate = useNavigate();
  
  // Estados del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validaciones
    if (!name.trim()) return toast.warning('El nombre es obligatorio');
    if (price <= 0) return toast.warning('El precio debe ser mayor a 0');
    if (description.length < 10) return toast.warning('La descripción debe tener al menos 10 caracteres');

    setIsSubmitting(true);

    const newProduct = {
      name,
      price: Number(price),
      description,
      image: 'https://loremflickr.com/640/480/tech' // Imagen por defecto (aleatoria)
    };

    try {
      // 2. Enviar a MockAPI (POST)
      const response = await fetch('https://68e96c50f1eeb3f856e3fed9.mockapi.io/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        toast.success('¡Producto creado con éxito!');
        navigate('/admin'); // Volver al panel
      } else {
        throw new Error('Error al crear');
      }
    } catch (error) {
      toast.error('Hubo un error al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', color: 'white' }}>
      <h1>Nuevo Producto</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Nombre del Producto</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
            placeholder="Ej. Laptop Gamer"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Precio</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
            placeholder="Ej. 1500"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Descripción</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: 'white', minHeight: '100px' }}
            placeholder="Describe el producto..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '12px', 
            backgroundColor: isSubmitting ? '#555' : '#28a745', 
            color: 'white', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '10px'
          }}
        >
          {isSubmitting ? 'Guardando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;