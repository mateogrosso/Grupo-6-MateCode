import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/main.css';

export default function OrdersPage() {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Error fetching orders');
                }
            } catch (error) {
                console.error('Error de conexión', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Helper de moneda
    const aMonedaARS = (n) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0,
        }).format(n);

    if (loading) {
        return (
            <main className="seccion-productos">
                <div className="catalogo-wrapper">
                    <p style={{ textAlign: 'center', color: '#A0522D' }}>Cargando pedidos...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="seccion-productos">
            <div className="catalogo-wrapper">
                <div className="catalogo-header">
                    <h2><strong>Mis Pedidos</strong></h2>
                </div>

                {orders.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#7A3E22', fontSize: '1rem' }}>
                        No has realizado ningún pedido aún.
                    </p>
                ) : (
                    <div className="productos-grid">
                        {orders.map((order) => (
                            <div key={order._id} style={{
                                background: 'linear-gradient(180deg, #FFE8C9, #FFE1BE)',
                                border: '1px solid rgba(160, 82, 45, .14)',
                                borderRadius: '14px',
                                boxShadow: '0 12px 26px rgba(0, 0, 0, .10)',
                                padding: '1.5rem',
                                width: '100%',
                                maxWidth: '25rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    paddingBottom: '1rem',
                                    borderBottom: '2px solid rgba(160, 82, 45, .2)'
                                }}>
                                    <span style={{ color: '#7A3E22', fontSize: '0.85rem' }}>
                                        <strong>Pedido:</strong> #{order._id.slice(-8)}
                                    </span>
                                    <span style={{ color: '#7A3E22', fontSize: '0.85rem' }}>
                                        <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                                    {order.items.map((item, index) => (
                                        <li key={index} style={{
                                            marginBottom: '0.5rem',
                                            color: '#7A3E22',
                                            fontSize: '0.9rem'
                                        }}>
                                            {item.cantidad}x {item.nombre} - {aMonedaARS(item.precio)}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '2px solid rgba(160, 82, 45, .2)',
                                    textAlign: 'right',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    color: '#A0522D'
                                }}>
                                    Total: {aMonedaARS(order.total)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
