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
  const [currentView, setCurrentView] = useState(VIEW.CATALOG);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Carga inicial de productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      try {
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

  // 🔹 Agregar al carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCarrito((prevCarrito) => {
      const exists = prevCarrito.find((item) => item.id === product.id);
      if (exists) {
        return prevCarrito.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + quantity }
            : item
        );
      } else {
        return [...prevCarrito, { ...product, cantidad: quantity }];
      }
    });
    alert(`${quantity} x ${product.nombre} añadido al carrito!`);
  };

  // 🔹 Cambiar de vista (catálogo / detalle / contacto)
  const handleChangeView = (view, product = null) => {
    console.log('🧭 Cambio de vista:', view, product);
    setCurrentView(view);
    setSelectedProduct(product);
  };

  // 🔹 Renderizado condicional principal
  const renderContent = () => {
    if (loading) return <div className="message loading">Cargando catálogo...</div>;
    if (error) return <div className="message error">{error}</div>;

    switch (currentView) {
      case VIEW.DETAIL:
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onGoBack={() => handleChangeView(VIEW.CATALOG)}
          />
        ) : (
          handleChangeView(VIEW.CATALOG)
        );

      case VIEW.CONTACT:
        return <ContactForm onGoBack={() => handleChangeView(VIEW.CATALOG)} />;

      case VIEW.CATALOG:
      default:
        return (
          <ProductList
            productos={productos}
            onSelectProduct={handleChangeView}
          />
        );
    }
  };

  // 🔹 Render principal
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
