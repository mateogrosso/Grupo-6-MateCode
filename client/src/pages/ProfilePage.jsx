import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function ProfilePage() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <main className="seccion-productos">
                <div className="catalogo-wrapper">
                    <p style={{ textAlign: 'center', color: '#A0522D' }}>Cargando perfil...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="seccion-productos">
            <div style={{
                background: 'linear-gradient(180deg, #FFE8C9, #FFE1BE)',
                border: '1px solid rgba(160, 82, 45, .14)',
                borderRadius: '14px',
                boxShadow: '0 12px 26px rgba(0, 0, 0, .10)',
                padding: '1.5rem',
                maxWidth: '400px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    color: '#A0522D',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontWeight: '700'
                }}>
                    Mi Perfil
                </h2>

                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ color: '#7A3E22', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                        <strong>Nombre de usuario:</strong> {user.username}
                    </p>
                    <p style={{ color: '#7A3E22', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/mis-pedidos" className="btn-link">
                        Ver Mis Pedidos
                    </Link>
                </div>
            </div>
        </main>
    );
}
