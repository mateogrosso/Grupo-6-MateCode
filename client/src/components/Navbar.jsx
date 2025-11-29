import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/main.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

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

            {user ? (
              <li>
                <div className="navbar-user-container">
                  <div
                    className="user-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <span className="user-icon">👤</span>
                    <span>{user.username}</span>
                  </div>

                  {menuOpen && (
                    <div className="user-dropdown">
                      <div className="dropdown-greeting">
                        ¡Hola!, {user.username}
                      </div>
                      <Link to="/perfil" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                        Mi Perfil
                      </Link>
                      <Link to="/mis-pedidos" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                        Mis Pedidos
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="dropdown-logout"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-btn">
                    Ingresar
                  </Link>
                </li>
                <li className='btn-register-li'>
                  <Link to="/register" className="nav-btn">
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/carrito" className="nav-cart" aria-label="Carrito">
                <img
                  className="carritoCompras-logo"
                  src="/media/carrito-de-compras.png"
                  alt="Carrito de compras"
                />
                <span id="cart-count" className="cart-count">
                  {getCartCount()}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}