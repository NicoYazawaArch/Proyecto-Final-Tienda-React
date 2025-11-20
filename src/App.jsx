// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartPage from './pages/CartPage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" /> 
      
      <Navbar />

      <main className="main-container">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/item/:itemId" element={<ItemDetailPage />} />
          
          {/* Rutas Protegidas */}
          <Route 
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin/create"
            element={
              <ProtectedRoute>
                  <CreateProductPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin/edit/:id" 
            element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;