import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// Creo el componente Proveedor
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la app, revisamos si hay un token guardado
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                // Verificamos si el token ha expirado
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Token inválido", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    // Función para Login
    const login = (tokenRecibido, datosUsuario) => {
        localStorage.setItem('token', tokenRecibido);
        setToken(tokenRecibido);

        // Si el backend ya nos da los datos del usuario, los usamos. 
        // Si no, decodificamos el token.
        if (datosUsuario) {
            setUser(datosUsuario);
        } else {
            const decoded = jwtDecode(tokenRecibido);
            setUser(decoded);
        }
    };

    // Función para Logout
    const logout = () => {
        localStorage.removeItem('token'); // Borrar del disco
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};