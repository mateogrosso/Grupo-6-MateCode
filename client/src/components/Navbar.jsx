import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="header-titulo">
        <h1>Mueblería Hermanos Jota</h1>
      </div>

      <div className="header-logo">
        <Link to="/">
          <img
            src="/media/logo.svg"
            alt="Logo Mueblería"
            className="logo-img"
          />
        </Link>
      </div>
      <div className="header-navegador">
        <nav>
          <ul className="header-lista">
            <li>
              <Link to="/" className="nav-btn">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/productos" className="nav-btn">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/FormularioDeContacto" className="nav-btn">
                Contacto
              </Link>
            </li>

            <li>
              <Link to="/carrito" className="nav-cart" aria-label="Carrito">
                <img
                  className="carritoCompras-logo"
                  src="/media/carrito-de-compras.png"
                  alt="Carrito de compras"
                />
                <span id="cart-count" className="cart-count">
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}