import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import CrearProducto from "./components/CrearProducto";
import Carrito from "./components/Carrito";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import "./styles/main.css";

export default function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productos" element={<ProductList />} />
          <Route
            path="/productos/:id"
            element={<ProductDetail />}
          />
          <Route path="/FormularioDeContacto" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
          <Route
            path="/carrito"
            element={<Carrito />}
          />
          <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/mis-pedidos" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
