// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import styles from './Navbar.module.css';

const Navbar = () => { 
  const { isAuthenticated, logout } = useAuth();
  const { quantity } = useCart(); 

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>Tienda</Link>
      <div className={styles.links}>
        <Link to="/">Inicio</Link>
      </div>

      {/* 👇 Esta es la versión limpia y correcta de las acciones 👇 */}
      <div className={styles.actions}>
        <Link to="/cart" className={styles.cartLink}>🛒 Carrito ({quantity})</Link>
        
        {isAuthenticated ? (
          <>
            {/* Enlace al Admin visible solo si está logueado */}
            <Link to="/admin" style={{ color: 'var(--color-texto)', marginRight: '15px', fontWeight: 'bold', textDecoration: 'none' }}>
              Admin
            </Link>
            
            <button onClick={logout} className={styles.authButton}>Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className={styles.authLink}>Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;