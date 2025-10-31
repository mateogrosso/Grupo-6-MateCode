import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import CrearProducto from "./components/CrearProducto";

import "./styles/main.css";

export default function App() {

  const [carrito, setCarrito] = useState(() => {
    const saved = sessionStorage.getItem("hj_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("hj_cart", JSON.stringify(carrito));
  }, [carrito]);

  const handleAddToCart = (producto, cantidad = 1) => {
    setCarrito((carritoPrevio) => {
      const existe = carritoPrevio.find((p) => p.id === producto.id);
      if (existe) {
        return carritoPrevio.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p );
      } else {
        return [...carritoPrevio, { ...producto, cantidad }];
      }
    });
  };
  
  const cartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div>
        <Navbar cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/productos" element={<ProductList />} />
          <Route
            path="/productos/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/FormularioDeContacto" element={<ContactForm />} />
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
    );
}
