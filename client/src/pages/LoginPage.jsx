import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el login');
            }

            login(data.token, data.user);
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-form">
            <h2 className="auth-title">Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />
                </div>

                <div className="auth-actions">
                    <button type="submit" className="auth-button">
                        Ingresar
                    </button>
                    <Link to="/register" className="auth-link">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;