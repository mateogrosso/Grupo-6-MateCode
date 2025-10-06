import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import { fetchProductos } from './services/ProductService';
import './styles/main.css';

const VIEW = { 
  HOME: 'home',
  CATALOG: 'catalog',
  DETAIL: 'detail',
  CONTACT: 'contact',
};

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const stored = sessionStorage.getItem('hj_cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentView, setCurrentView] = useState(VIEW.HOME);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prefetch del catálogo
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos(); 
        console.log('📦 Productos cargados desde la API:', data);
        setProductos(data);
      } catch (err) {
        console.error('Error al conectar con la API:', err);
        setError('Error al conectar con la API.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Persistir carrito en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('hj_cart', JSON.stringify(carrito));
  }, [carrito]);

  // Añadir producto al carrito (sin alert)
  const handleAddToCart = (product, quantity = 1) => {
    setCarrito(prev => {
      const exists = prev.find(item => item.id === product.id);
      return exists
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + quantity }
              : item
          )
        : [...prev, { ...product, cantidad: quantity }];
    });
  };

  // Cambio de vista
  const handleChangeView = (view, product = null) => {
    console.log('Cambio de vista:', view, product);
    setCurrentView(view);
    setSelectedProduct(product);
  };

  // Renderizado dinámico
  const renderContent = () => {
    if (currentView === VIEW.CATALOG) {
      if (loading) return <div className="message loading">Cargando catálogo...</div>;
      if (error)   return <div className="message error">{error}</div>;
    }

    switch (currentView) {
      case VIEW.HOME:
        return <Home onNavigate={handleChangeView} onAddToCart={handleAddToCart} />;


      case VIEW.DETAIL:
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onGoBack={() => handleChangeView(VIEW.CATALOG)}
          />
        ) : (
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

  // Total de productos en carrito
  const cartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onNavigate={handleChangeView}
      />

      <main className="container" style={{ padding: '2rem' }}>
        {renderContent()}
      </main>

      <footer>
        <ul className="footer-lista">
          <li>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              Whatsapp
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="mailto:contacto@muebleriajota.com" target="_blank" rel="noopener noreferrer">
              Email
            </a>
          </li>
        </ul>

        <p className="footer-copyright">
          © Todos los derechos reservados - {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;