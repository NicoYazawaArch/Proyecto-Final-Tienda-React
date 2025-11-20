// src/pages/ItemDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://68e96c50f1eeb3f856e3fed9.mockapi.io/products'; 

    fetch(`${apiUrl}/${itemId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) return <p style={{color: 'white', textAlign: 'center'}}>Cargando detalle...</p>;
  if (error) return <p style={{color: 'white', textAlign: 'center'}}>Error: {error.message}</p>;
  if (!product) return <p style={{color: 'white', textAlign: 'center'}}>Producto no encontrado.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      
      {/* Helmet para cambiar el título de la pestaña */}
      <Helmet>
        <title>{product.name} | Tienda</title>
      </Helmet>

      <h1 style={{marginBottom: '20px'}}>{product.name}</h1>
      
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '100%',           
          maxWidth: '400px',       
          height: '400px',         
          objectFit: 'cover',      
          borderRadius: '8px',     
          display: 'block',        
          margin: '20px 0',        
          border: '1px solid #444' 
        }} 
      />

      <h2 style={{ color: 'var(--color-primario)' }}>Precio: ${product.price}</h2>
      
      <p style={{ lineHeight: '1.6', color: '#ccc', marginTop: '20px', fontSize: '1.1rem' }}>
        {product.description || `Descripción detallada del producto ${product.name}.`}
      </p>
    </div>
  );
};

export default ItemDetailPage;