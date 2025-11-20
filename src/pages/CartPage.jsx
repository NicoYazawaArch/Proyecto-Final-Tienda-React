import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; 
import { FaTrash } from 'react-icons/fa'; 

const CartPage = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();

  const handlePurchase = () => {
    // Aquí simulamos la compra
    toast.success(`¡Compra realizada por $${total}! Gracias por tu visita.`);
    clearCart(); // Vaciamos el carrito
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h1>Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ 
              borderBottom: '1px solid #444', 
              padding: '15px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '5px' }} />
                <span>{item.name} - <strong>${item.price}</strong></span>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#ff4d4d', 
                  border: '1px solid #ff4d4d', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Eliminar producto"
              >
                <FaTrash /> {/* Usamos íconos en lugar de texto */}
              </button>
            </div>
          ))}
          
          <h2 style={{ marginTop: '30px', textAlign: 'right' }}>Total: ${total}</h2>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
            <button 
              onClick={clearCart}
              style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Vaciar Carrito
            </button>

            <button 
              onClick={handlePurchase}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;