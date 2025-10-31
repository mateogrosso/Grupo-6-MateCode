import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/index.css';
import { fetchProductosDestacados } from "../services/ProductService";

export default function Home({ onAddToCart }) {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const aMonedaARS = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(n);


  const agregarAlCarrito = (producto) => {
    if (onAddToCart) onAddToCart(producto, 1);
  };


  useEffect(() => {
    const obtenerDestacados = async () => {
      try {
        const data = await fetchProductosDestacados();

        if (!Array.isArray(data) || data.length === 0) {
          setError("No hay productos destacados disponibles.");
        } else {
          setDestacados(data);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setLoading(false);
      }
    };

    obtenerDestacados();
  }, []);

  if (loading) return <p className="message loading">Cargando destacados...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
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

        <div className="destacados-grid">
          {destacados.length === 0 ? (
            <p>No se encontraron productos destacados.</p>
          ) : (
            destacados.map((prod) => (
              <article key={prod.id} className="destacados-card">
                <img
                  className="destacados-img"
                  loading="lazy"
                  src={prod.img}
                  alt={prod.nombre}
                />

                <div className="destacados-info">
                  <h3 className="destacados-title">
                    {prod.nombre.toUpperCase()}
                  </h3>
                  <p className="destacados-price">{aMonedaARS(prod.precio)}</p>

                  <div className="destacados-actions">
                    <button
                      className="btn-link"
                      onClick={() => navigate(`/productos/${prod.id}`)}
                    >
                      Ver producto
                    </button>

                    <button
                      className="btn-add"
                      onClick={() => agregarAlCarrito(prod)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}