// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Estados para los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Validación simple (Simulada)
    if (email === 'admin@tienda.com' && password === '123456') {
      login(); // Activa la sesión en el contexto
      toast.success('¡Bienvenido de nuevo!');
      navigate('/');
    } else {
      toast.error('Credenciales incorrectas. Prueba: admin@tienda.com / 123456');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh' // Centrado vertical
    }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'var(--color-superficie)',
          padding: '40px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          border: '1px solid #444'
        }}
      >
        <h1 style={{ textAlign: 'center', color: 'var(--color-primario)' }}>Iniciar Sesión</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', color: '#ccc' }}>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@tienda.com"
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
            required 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', color: '#ccc' }}>Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
            required 
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: '10px',
            padding: '12px', 
            backgroundColor: 'var(--color-primario)', 
            color: '#1a1a1a', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;