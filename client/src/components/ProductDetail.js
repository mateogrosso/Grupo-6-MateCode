import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => {
        setProducto(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/">← Volver al catálogo</Link>
      <img
        src={producto.img}
        alt={producto.nombre}
        style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }}
      />
      <h2 style={{ marginTop: '1rem' }}>{producto.nombre}</h2>
      <p style={{ fontSize: '1.2rem', color: '#333' }}>${producto.precio}</p>
      <p style={{ marginTop: '1rem' }}>{producto.descripcion}</p>

      <h4 style={{ marginTop: '1.5rem' }}>Ficha técnica</h4>
      <ul>
        {producto.ficha.map((item, i) => (
          <li key={i}>
            <strong>{item.label}:</strong> {item.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
