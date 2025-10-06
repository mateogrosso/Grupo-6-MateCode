import React, { useEffect, useState } from 'react';
import '../styles/main.css';
import '../styles/index.css';

export default function Home({ onNavigate }) {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(
    Number(sessionStorage.getItem('hj_cart_count') || 0)
  );

  // Helper para formatear a moneda
  const aMonedaARS = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(n);

  // Incrementar carrito
  const sumarAlCarrito = () => {
    const nuevo = cartCount + 1;
    setCartCount(nuevo);
    sessionStorage.setItem('hj_cart_count', String(nuevo));
  };

  // Traer productos destacados
useEffect(() => {
  const fetchDestacados = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/productos/destacados');
      if (!res.ok) throw new Error('Error al cargar los destacados');
      const data = await res.json();

      // En caso de que el backend devuelva array vacío:
      if (!Array.isArray(data) || data.length === 0) {
        setError('No hay productos destacados disponibles.');
      } else {
        setDestacados(data);
      }
    } catch (err) {
      console.error('Error obteniendo destacados:', err);
      setError('No se pudieron cargar los productos destacados.');
    } finally {
      setLoading(false);
    }
  };

  fetchDestacados();
}, []);


  // Renderizado condicional
  if (loading) return <p className="message loading">Cargando destacados...</p>;
  if (error)
    return <p className="message error">{error}</p>;

  return (
    <main>
      {/* Banner principal */}
      <section className="hero-banner">
        <img
          className="hero-banner-logo"
          src="/media/hero_banner.png"
          alt="Hero Banner principal"
        />
      </section>

      {/* Sección de destacados */}
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
                      onClick={() => onNavigate('detail', prod)}
                    >
                      Ver producto
                    </button>

                    <button
                      className="btn-add"
                      onClick={sumarAlCarrito}
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
