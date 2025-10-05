import React, { useEffect, useState } from 'react';
import '../styles/main.css';

export default function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/productos')
      .then(res => res.json())
      .then(data => {
        // Filtramos los destacados
        const productosDestacados = data.filter(prod => prod.destacado);
        setDestacados(productosDestacados);
      });
  }, []);

  return (
    <main>
      <section className="hero-banner">
        <img
          className="hero-banner-logo"
          src="/media/hero_banner.png"
          alt="Hero principal"
        />
      </section>

      <section className="seccion-destacados">
        <h2>Productos Destacados</h2>
        <div id="destacados-grid" className="destacados-grid" aria-live="polite">
          {destacados.map(prod => (
            <div key={prod.id} className="producto-card">
              <img src={prod.img} alt={prod.nombre} />
              <div className="producto-info">
                <h3 className="producto-title">{prod.nombre}</h3>
                <p className="producto-price">${prod.precio}</p>
                <a href={`/producto/${prod.id}`} className="btn-link">
                  Ver detalle
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
