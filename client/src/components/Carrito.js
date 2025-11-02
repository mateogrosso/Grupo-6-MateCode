import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Carrito.css';

export default function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

  // Helper de moneda
  const aMonedaARS = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(n);

  // Calcular el total
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Función para eliminar un item del carrito
  const eliminarDelCarrito = (idProducto) => {
    const confirmar = window.confirm('¿Quitar este producto del carrito?');
    if (confirmar) {
      setCarrito((carritoPrevio) =>
        carritoPrevio.filter((item) => item.id !== idProducto)
      );
    }
  };

  // --- RENDERIZADO ---

  if (carrito.length === 0) {
    return (
      <main className="cart-container cart-empty">
        <h2 className="cart-title">Tu carrito está vacío</h2>
        <p>Parece que todavía no has añadido ningún producto.</p>
        <div className="cart-summary">
          <button
            className="cart-button-secondary"
            onClick={() => navigate('/productos')}
          >
            Ver productos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <h2 className="cart-title">Tu Carrito de Compras</h2>

      <div className="cart-list">
        {carrito.map((item) => (
          <article key={item.id} className="cart-item">
            <img
              src={item.img}
              alt={item.nombre}
              className="cart-item-img"
              onClick={() => navigate(`/productos/${item.id}`)}
            />

            <div className="cart-item-info">
              <Link to={`/productos/${item.id}`}>
                <h3 className="cart-item-title">{item.nombre}</h3>
              </Link>
              <p className="cart-item-text">Cantidad: {item.cantidad}</p>
              <p className="cart-item-price">
                {aMonedaARS(item.precio * item.cantidad)}
                {item.cantidad > 1 && (
                  <span className="cart-item-unit-price">
                    ({aMonedaARS(item.precio)} c/u)
                  </span>
                )}
              </p>
            </div>

            <button
              className="cart-item-remove"
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
            >
              ✕
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h3 className="cart-total">Total: {aMonedaARS(total)}</h3>
        <div className="cart-actions">
          <button
            className="cart-button-secondary"
            onClick={() => navigate('/productos')}
          >
            Seguir comprando
          </button>
          <button
            className="cart-button-primary"
            onClick={() => alert('¡Gracias por tu compra!')}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </main>
  );
}
