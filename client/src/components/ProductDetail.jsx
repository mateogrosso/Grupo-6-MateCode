import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/detalle_producto.css';

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

  if (loading) return <p className="estado-carga">Cargando producto...</p>;
  if (error) return <p className="estado-error">{error}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <main>
      <section className="seccion-productoIndividual">
        <div className="imagen-productoIndividual">
          <img src={producto.img} alt={producto.nombre} />
        </div>

        <div className="info-detallada-productoIndividual">
          <h2 className="nombre-productoIndividual">{producto.nombre}</h2>
          <p className="prod-desc">{producto.descripcion}</p>

          <h3 className="ficha-titulo">Ficha técnica</h3>
          <ul className="ficha-list">
            {producto.ficha.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong>
                <span className="f-value">{item.valor}</span>
              </li>
            ))}
          </ul>

          <p className="precioIndividual">${producto.precio}</p>

          <div className="acciones-detalle">
            <button id="btn-add" className="btn-add">
              Añadir al carrito
            </button>

            <Link to="/productos" className="btn-volver">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
