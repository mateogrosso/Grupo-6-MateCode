import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
          <Route path="/" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/contacto" element={<ContactForm />} />
        </Routes>
      </main>
      <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', background: '#eee' }}>
        <p>© 2025 Mueblería MateCode</p>
      </footer>
    </Router>
  );
}

export default App;
