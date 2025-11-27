import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // 1. Mientras verificamos si hay token, mostramos un spinner o nada
    if (loading) return <div>Cargando autorización...</div>;

    // 2. Si terminó de cargar y NO hay usuario, lo mandamos al Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si hay usuario, dejamos pasar y mostramos el componente hijo
    return children;
};

export default ProtectedRoute;