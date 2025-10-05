import React, { useEffect, useState } from 'react';
import '../styles/main.css';
import '../styles/productos.css';

export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrado por nombre o descripción
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    prod.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <p className="estado-carga">Cargando productos...</p>;
  if (error) return <p className="estado-error">Error: {error}</p>;

  return (
    <main>
      <section className="seccion-productos">
        <h2>Catálogo de productos</h2>

        {/* Buscador */}
        <div className="buscador-producto">
          <input
            type="text"
            className="buscador-input"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>

        {/* Grid de productos */}
        <div className="productos-grid">
          {productosFiltrados.map(prod => (
            <div key={prod.id} className="producto-card">
              <img src={prod.img} alt={prod.nombre} />

              <div className="producto-info">
                <h3 className="producto-title">{prod.nombre}</h3>
                <p className="producto-price">${prod.precio}</p>

                <div className="productos-actions">
                  <a
                    href={`/producto/${prod.id}`}
                    className="btn-link"
                  >
                    Ver detalle
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
