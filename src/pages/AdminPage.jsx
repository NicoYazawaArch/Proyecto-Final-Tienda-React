// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'https://68e96c50f1eeb3f856e3fed9.mockapi.io/products';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => toast.error('Error al cargar productos'));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            setProducts(products.filter(product => product.id !== id));
            toast.success('Producto eliminado correctamente');
          } else {
            throw new Error('Error al eliminar');
          }
        })
        .catch(() => toast.error('No se pudo eliminar el producto'));
    }
  };

  if (loading) return <p style={{color: 'white', textAlign: 'center'}}>Cargando panel...</p>;

  return (
    <div style={{ padding: '20px', color: 'var(--color-texto)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Panel de Administración</h1>
        <Link to="/admin/create" style={{ 
          backgroundColor: '#28a745', color: 'white', padding: '10px 20px', 
          textDecoration: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' 
        }}>
          <FaPlus /> Nuevo Producto
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-superficie)' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #444', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Imagen</th>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Precio</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '10px' }}>{product.id}</td>
              <td style={{ padding: '10px' }}>
                <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
              </td>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px' }}>${product.price}</td>
              <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                
                {/* Botón Eliminar */}
                <button 
                  onClick={() => handleDelete(product.id)}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <FaTrash />
                </button>

                
                <Link to={`/admin/edit/${product.id}`}>
                  <button 
                    style={{ backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <FaEdit />
                  </button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;