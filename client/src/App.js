import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import ContactForm from './Components/ContactForm';
import { fetchProductos } from './Services/ProductService';
import './styles/main.css';

const VIEW = { 
  HOME: 'home',
  CATALOG: 'catalog',
  DETAIL: 'detail',
  CONTACT: 'contact',
};

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [currentView, setCurrentView] = useState(VIEW.HOME);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);       // loader del catálogo
  const [error, setError] = useState(null);            // error del catálogo

  // Prefetch del catálogo (no bloquea el Home)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos(); 
        console.log('✅ Productos cargados desde la API:', data);
        setProductos(data);
      } catch (err) {
        console.error('❌ Error al conectar con la API:', err);
        setError('Error al conectar con la API.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    setCarrito(prev => {
      const exists = prev.find(item => item.id === product.id);
      return exists
        ? prev.map(item =>
            item.id === product.id ? { ...item, cantidad: item.cantidad + quantity } : item
          )
        : [...prev, { ...product, cantidad: quantity }];
    });
    alert(`${quantity} x ${product.nombre} añadido al carrito!`);
  };

  const handleChangeView = (view, product = null) => {
    console.log('🧭 Cambio de vista:', view, product);
    setCurrentView(view);
    setSelectedProduct(product);
  };

  const renderContent = () => {
    // Loader/error SOLO cuando se muestra el catálogo
    if (currentView === VIEW.CATALOG) {
      if (loading) return <div className="message loading">Cargando catálogo...</div>;
      if (error)   return <div className="message error">{error}</div>;
    }

    switch (currentView) {
      case VIEW.HOME:
        return <Home onNavigate={handleChangeView} />;

      case VIEW.DETAIL:
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onGoBack={() => handleChangeView(VIEW.CATALOG)}
          />
        ) : (
          // fallback si no hay producto seleccionado
          <Home onNavigate={handleChangeView} />
        );

      case VIEW.CONTACT:
        return <ContactForm onGoBack={() => handleChangeView(VIEW.CATALOG)} />;

      case VIEW.CATALOG:
        return (
          <ProductList
            productos={productos}
            onSelectProduct={handleChangeView}
          />
        );

      default:
        return <Home onNavigate={handleChangeView} />;
    }
  };

  return (
    <div className="App">
      <Navbar
        cartCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        onNavigate={handleChangeView}
      />

      <main className="container" style={{ padding: '2rem' }}>
        {renderContent()}
      </main>

      <footer>
        <ul className="footer-lista">
          <li><a href="#whatsapp" onClick={(e) => e.preventDefault()}>Whatsapp</a></li>
          <li><a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a></li>
          <li><a href="#twitter" onClick={(e) => e.preventDefault()}>Twitter</a></li>
          <li><a href="#email" onClick={(e) => e.preventDefault()}>Email</a></li>
        </ul>
        <p className="footer-copyright">
          © Todos los derechos reservados - {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
