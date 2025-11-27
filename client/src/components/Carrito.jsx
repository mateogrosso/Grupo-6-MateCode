import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Carrito.css';

export default function Carrito() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState("");

  const aMonedaARS = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(n);

  const eliminarDelCarrito = (idProducto) => {
    const confirmar = window.confirm('¿Quitar este producto del carrito?');
    if (confirmar) {
      removeFromCart(idProducto);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra.");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productoId: item._id,
          nombre: item.nombre,
          cantidad: item.quantity,
          precio: item.precio
        })),
        total: getCartTotal()
      };

      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        alert('¡Gracias por tu compra! El pedido se guardó correctamente.');
        navigate('/');
      } else {

        const text = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message;
        } catch (e) {
          errorMessage = text;
        }

        console.error('Error del servidor:', errorMessage);
        alert(`Error ${response.status}: ${errorMessage || "Hubo un error al procesar el pedido."}`);
      }
    } catch (error) {
      console.error('Error de red o ejecución:', error);
      alert(`Error de conexión: ${error.message}`);
    }
  };


  if (cartItems.length === 0) {
    return (
      <main className="cart-container cart-empty">
        <h2 className="cart-title"><strong>Tu carrito está vacío</strong></h2>
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
      <h2 className="cart-title"><strong>Tu Carrito de Compras</strong></h2>
      {mensaje && <p style={{ color: 'red', textAlign: 'center' }}>{mensaje}</p>}

      <div className="cart-list">
        {cartItems.map((item) => (
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
              <p className="cart-item-text">Cantidad: {item.quantity}</p>
              <p className="cart-item-price">
                {aMonedaARS(item.precio * item.quantity)}
                {item.quantity > 1 && (
                  <span className="cart-item-unit-price">
                    ({aMonedaARS(item.precio)} c/u)
                  </span>
                )}
              </p>
            </div>

            <button
              className="cart-item-remove"
              onClick={() => eliminarDelCarrito(item._id)}
              title="Eliminar producto"
            >
              ✕
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h3 className="cart-total">Total: {aMonedaARS(getCartTotal())}</h3>
        <div className="cart-actions">
          <button
            className="cart-button-secondary"
            onClick={() => navigate('/productos')}
          >
            Seguir comprando
          </button>
          <button
            className="cart-button-primary"
            onClick={handleCheckout}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </main>
  );
}
