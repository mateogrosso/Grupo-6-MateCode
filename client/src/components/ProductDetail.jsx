import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/main.css";
import "../styles/detalle_producto.css";
import { fetchProductoById, fetchEliminarProducto } from "../services/ProductService";

export default function ProductDetail({ onAddToCart }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setLoading(true);
        const data = await fetchProductoById(id);

        setProducto(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error al cargar producto");
      } finally {
        setLoading(false);
      }
    };
    obtenerProducto();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) {
    return (
      <main>
        <p>{error}</p>
        <button className="btn-volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </main>
    );
  }
  if (!producto) {
    return (
      <main>
        <p>Producto no disponible.</p>
        <button className="btn-volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </main>
    );
  }

  const handleEliminar = async () => {
  const confirmar = window.confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`);
  if (!confirmar) return;

  try {
    await fetchEliminarProducto(id);
    navigate('/productos');
  } catch (error) {
    console.error(error);
    alert('Error al intentar de elimnar el producto');
  }
};


  return (
    <main>
      <section className="seccion-productoIndividual">
        <div className="imagen-productoIndividual">
          <img src={producto.img} alt={producto.nombre} />
        </div>

        <div className="info-detallada-productoIndividual">
          <h2 className="nombre-productoIndividual">{producto.nombre}</h2>
          <p className="prod-desc">{producto.descripcion}</p>

          {producto.ficha && producto.ficha.length > 0 && (
            <>
              <h3 className="ficha-titulo">Ficha técnica</h3>
              <ul className="ficha-list">
                {producto.ficha.map((item, index) => (
                  <li key={index}>
                    <strong>{item.label}:</strong> {item.valor}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="precioIndividual">${new Intl.NumberFormat('es-AR').format(producto.precio)}</p>

          <div className="acciones-detalle">
            <div className="bloque-compra">
              <div className="cantidad-control">
                <label>Cantidad:</label>
                <div className="selector-cantidad">
                  <button
                    type="button"
                    className="btn-cantidad"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    -
                  </button>

                  <span className="valor-cantidad">{cantidad}</span>

                  <button
                    type="button"
                    className="btn-cantidad"
                    onClick={() => setCantidad(cantidad + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                id="btn-add"
                className="btn-add"
                onClick={() => onAddToCart(producto, cantidad)}
              >
                Añadir al carrito
              </button>
            </div>

            <button className="btn-volver" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button className="btn-eliminar" onClick={handleEliminar}>
              Eliminar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}