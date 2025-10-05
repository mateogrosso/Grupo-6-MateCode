import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/main.css';

export default function Navbar() {
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
              <NavLink className="nav-btn" to="/" end>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-btn" to="/productos">
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-btn" to="/contacto">
                Contacto
              </NavLink>
            </li>
            <li>
              <Link to="#" className="nav-cart" aria-label="Carrito">
                <img
                  className="carritoCompras-logo"
                  src="/media/carrito-de-compras.png"
                  alt="Carrito de compras"
                />
                <span id="cart-count" className="cart-count">
                  0
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
