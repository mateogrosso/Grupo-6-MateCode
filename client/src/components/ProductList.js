import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      {productos.map(prod => (
        <Link
          key={prod.id}
          to={`/producto/${prod.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <img
              src={prod.img}
              alt={prod.nombre}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{prod.nombre}</h3>
            <p>${prod.precio}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
