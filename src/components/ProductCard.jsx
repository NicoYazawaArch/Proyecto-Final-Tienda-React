// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={{
        border: '1px solid #444', 
        padding: '1rem', 
        margin: '1rem', 
        width: '220px',      
        height: '400px',     /* 1. ALTURA FIJA DE LA TARJETA: Para que todas sean iguales */
        backgroundColor: 'var(--color-superficie)', 
        borderRadius: '8px',
        color: 'var(--color-texto)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between' /* Empuja el contenido para llenar el espacio */
      }}>
      
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '100%', 
          height: '180px',    /* 2. ALTURA FIJA DE IMAGEN: Define el espacio de la foto */
          objectFit: 'cover', /* 3. Recorta la imagen para que no se deforme */
          borderRadius: '4px' 
        }} 
      />
      
      {/* Contenedor para título y precio (para que queden alineados arriba del botón) */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link to={`/item/${product.id}`} style={{ color: 'var(--color-blanco)', textDecoration: 'none' }}>
          <h4 style={{ margin: '10px 0', fontSize: '1.1rem' }}>{product.name}</h4>
        </Link>
        
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-primario)' }}>
          ${product.price}
        </p>
      </div>
      
      <button 
        style={{ 
          backgroundColor: 'var(--color-primario)', 
          color: '#1a1a1a', 
          border: 'none', 
          padding: '10px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          width: '100%' /* Botón ocupa todo el ancho disponible */
        }}
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>

    </div>
  );
};

export default ProductCard;