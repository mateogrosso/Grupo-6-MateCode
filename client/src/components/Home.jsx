import React from 'react';
import '../styles/main.css';

export default function Home() {
  return (
    <>
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
                <a className="nav-btn" href="/" aria-current="page">
                  Inicio
                </a>
              </li>
              <li>
                <a className="nav-btn" href="/productos">
                  Productos
                </a>
              </li>
              <li>
                <a className="nav-btn" href="/contacto">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="nav-cart" aria-label="Carrito">
                  <img
                    className="carritoCompras-logo"
                    src="/media/carrito-de-compras.png"
                    alt="Carrito de compras"
                  />
                  <span id="cart-count" className="cart-count">
                    0
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-banner">
          <img
            className="hero-banner-logo"
            src="/media/hero_banner.png"
            alt="Hero Banner principal"
          />
        </section>

        <section className="seccion-destacados">
          <h2>Productos Destacados</h2>
          <div id="destacados-grid" className="destacados-grid" aria-live="polite"></div>
        </section>
      </main>

      <footer>
        <ul className="footer-lista">
          <li>
            <a href="">Whatsapp</a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="">Twitter</a>
          </li>
          <li>
            <a href="">Email</a>
          </li>
        </ul>

        <p className="footer-copyright">
          &copy; Todos los derechos reservados - 2025
        </p>
      </footer>
    </>
  );
}
