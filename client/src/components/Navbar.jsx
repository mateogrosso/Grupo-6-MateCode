import React from 'react';
import '../styles/main.css';

export default function Navbar({ cartCount, onNavigate }) {
  return (
    <header>
      <div className="header-titulo">
        <h1>Mueblería Hermanos Jota</h1>
      </div>

      <div className="header-logo">
        <img src="/media/logo.svg" alt="Logo" />
      </div>

      <div className="header-navegador">
        <nav>
          <ul className="header-lista">
            <li>
              <button
                className="nav-btn"
                onClick={() => onNavigate('catalog')}
              >
                Inicio
              </button>
            </li>

            <li>
              <button
                className="nav-btn"
                onClick={() => onNavigate('catalog')}
              >
                Productos
              </button>
            </li>

            <li>
              <button
                className="nav-btn"
                onClick={() => onNavigate('contact')}
              >
                Contacto
              </button>
            </li>

            <li>
              <button className="nav-cart" aria-label="Carrito">
                <img
                  className="carritoCompras-logo"
                  src="/media/carrito-de-compras.png"
                  alt="Carrito de compras"
                />
                <span id="cart-count" className="cart-count">
                  {cartCount}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}