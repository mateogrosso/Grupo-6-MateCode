import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// Creo el componente Proveedor
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(storedToken);

                // Verificamos si el token ha expirado
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setToken(storedToken);

                    // traemos los datos reales del usuario desde el backend
                    const resp = await fetch('http://localhost:4000/api/usuarios/profile', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${storedToken}`,
                        },
                    });

                    if (resp.ok) {
                        const profile = await resp.json();
                        setUser({
                            id: profile._id,
                            username: profile.username,
                            email: profile.email,
                            roles: profile.roles,
                        });
                    } else {
                        // Si falla el perfil, hacemos logout para no dejar el estado raro
                        logout();
                    }
                }
            } catch (error) {
                console.error("Token inválido", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
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