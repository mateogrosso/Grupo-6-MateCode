import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/detalle_producto.css';

export default function ProductDetail({ product, onAddToCart, onGoBack }) {
  const [cantidad, setCantidad] = useState(1);

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const handleAdd = () => {
    onAddToCart(product, cantidad);
  };

  return (
    <main>
      <section className="seccion-productoIndividual">
        <div className="imagen-productoIndividual">
          <img src={product.img} alt={product.nombre} />
        </div>

        <div className="info-detallada-productoIndividual">
          <h2 className="nombre-productoIndividual">{product.nombre}</h2>
          <p className="prod-desc">{product.descripcion}</p>

          {/* Ficha técnica opcional */}
          {product.ficha && product.ficha.length > 0 && (
            <>
              <h3 className="ficha-titulo">Ficha técnica</h3>
              <ul className="ficha-list">
                {product.ficha.map((item, index) => (
                  <li key={index}>
                    <strong>{item.label}</strong>
                    <span className="f-value">{item.valor}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="precioIndividual">${product.precio}</p>

          <div className="acciones-detalle">
            <div className="cantidad-control">
              <label>Cantidad:</label>
              <input
                type="number"
                value={cantidad}
                min="1"
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="input-cantidad"
              />
            </div>

            <button id="btn-add" className="btn-add" onClick={handleAdd}>
              Añadir al carrito
            </button>

            <button className="btn-volver" onClick={onGoBack}>
              Volver al catálogo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
