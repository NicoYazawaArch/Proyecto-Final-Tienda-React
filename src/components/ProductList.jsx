// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  useEffect(() => {
    const apiUrl = 'https://68e96c50f1eeb3f856e3fed9.mockapi.io/products'; 

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Error en la red');
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(() => toast.error('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando productos...</p>;

  return (
    // CAMBIO maxWidth: '100%'
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '25px',
            border: '1px solid #555',
            backgroundColor: 'var(--color-superficie)',
            color: 'white',
            fontSize: '1.1rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        // CAMBIO 2: minmax(300px, 1fr)
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px', 
        width: '100%'
      }}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ color: '#aaa', width: '100%', textAlign: 'center', marginTop: '20px', gridColumn: '1 / -1' }}>
            No se encontraron productos que coincidan con "{searchTerm}".
          </p>
        )}
      </div>

      {filteredProducts.length > productsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            style={{
              padding: '10px 20px',
              backgroundColor: currentPage === 1 ? '#444' : 'var(--color-primario)',
              color: currentPage === 1 ? '#888' : '#1a1a1a',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Anterior
          </button>

          <span style={{ color: 'white', fontWeight: 'bold' }}>
            Página {currentPage} de {totalPages}
          </span>

          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '10px 20px',
              backgroundColor: currentPage === totalPages ? '#444' : 'var(--color-primario)',
              color: currentPage === totalPages ? '#888' : '#1a1a1a',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;