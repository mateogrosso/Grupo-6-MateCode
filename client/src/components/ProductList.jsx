import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/productos.css';
import { fetchProductos } from '../services/ProductService';

export default function ProductList() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(null);
    const [sugerenciasAbiertas, setSugerenciasAbiertas] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatosDeLaAPI = async () => {
            try {
                const respuesta = await fetchProductos();
                if (!Array.isArray(respuesta)) {
                    throw new Error('Formato inesperado de datos');
                }
                setProductos(respuesta);
            } catch (error) {
                console.error('Error capturado:', error);
                setError(error.message || 'Error al cargar los productos');
            } finally {
                setCargando(false);
            }
        };

        obtenerDatosDeLaAPI();
    }, []);

    const normalizar = (str) =>
        (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    const productosFiltrados = productos.filter((prod) => {
        const q = normalizar(busqueda.trim());
        if (!q) return true;
        const nombre = normalizar(prod.nombre);
        if (q.length === 1) {
            return nombre.startsWith(q);
        }
        return nombre.includes(q);
    });

    // Sugerencias para el autocompletado (hasta 8 resultados)
    const sugerencias = (() => {
        const q = normalizar(busqueda.trim());
        if (!q) return [];
        return productos
            .filter((p) => normalizar(p.nombre).includes(q))
            .slice(0, 8);
    })();

    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <section className="seccion-productos">
                <div className="catalogo-wrapper">
                    <div className="catalogo-header">
                        <h2><strong>Catálogo de productos</strong></h2>
                        <div className="buscador-producto">
                            <div className="buscador-wrapper">
                                <input
                                    type="text"
                                    className="buscador-input"
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    onFocus={() => setSugerenciasAbiertas(true)}
                                    onBlur={() => setTimeout(() => setSugerenciasAbiertas(false), 120)}
                                />
                                {sugerenciasAbiertas && busqueda && sugerencias.length > 0 && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((item) => (
                                            <li
                                                key={item.id}
                                                onMouseDown={() => {
                                                    setBusqueda(item.nombre);
                                                    setSugerenciasAbiertas(false);
                                                }}
                                            >
                                                {item.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="productos-grid">
                        {productosFiltrados.length === 0 ? (
                            <p>No se encontraron productos.</p>
                        ) : (
                            productosFiltrados.map((prod) => (
                                <div key={prod.id} className="producto-card">
                                    <img
                                        src={prod.img || '/media/placeholder.png'}
                                        alt={prod.nombre}
                                    />
                                    <div className="producto-info">
                                        <h3 className="producto-title">{prod.nombre}</h3>
                                        <p className="producto-price">${new Intl.NumberFormat('es-AR').format(prod.precio)}</p>
                                        <div className="productos-actions">
                                            <button
                                                className="btn-link"
                                                onClick={() => navigate(`/productos/${prod.id}`)}
                                            >
                                                Ver detalle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    </div>
            </section>
        </main>
        );
}