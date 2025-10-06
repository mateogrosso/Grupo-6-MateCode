import React, { useState } from 'react';
import '../styles/main.css'; 
import '../styles/productos.css';

export default function ProductList({ productos, onSelectProduct }) {
    const [busqueda, setBusqueda] = useState('');

    const handleViewDetail = (product) => {
        onSelectProduct('detail', product);
    };

    const normalizar = (str) =>
    (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');


    const productosFiltrados = productos.filter((prod) => {
        const q = normalizar(busqueda.trim());
        if (!q) return true; // si está vacío, mostrar todo

        const nombre = normalizar(prod.nombre);

        if (q.length === 1) {
            return nombre.startsWith(q);
        }

        return nombre.includes(q);
    });

    return (
        <main>
            <section className="seccion-productos">
                <h2>Catálogo de productos</h2>

                <div className="buscador-producto">
                    <input
                        type="text"
                        className="buscador-input"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="productos-grid">
                    {productosFiltrados.length === 0 ? (
                        <p>No se encontraron productos que coincidan con su búsqueda.</p>
                    ) : (
                        productosFiltrados.map(prod => (
                            <div key={prod.id} className="producto-card">
                                <img src={prod.img} alt={prod.nombre} />

                                <div className="producto-info">
                                    <h3 className="producto-title">{prod.nombre}</h3>
                                    <p className="producto-price">${prod.precio}</p>

                                    <div className="productos-actions">
                                        <button
                                            onClick={() => handleViewDetail(prod)}
                                            className="btn-link"
                                        >
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}