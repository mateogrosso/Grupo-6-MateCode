import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/contacto" element={<ContactForm />} />
        </Routes>
      </main>
      <footer>
        <ul className="footer-lista">
          <li><a href="">Whatsapp</a></li>
          <li><a href="">Instagram</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Email</a></li>
        </ul>
        <p className="footer-copyright">
          © Todos los derechos reservados - 2025
        </p>
      </footer>
    </Router>
  );
}

export default App;
