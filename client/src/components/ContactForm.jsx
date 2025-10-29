import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ importamos navigate
import '../styles/main.css';
import '../styles/contacto.css';

export default function ContactForm() {
  const navigate = useNavigate(); // ✅ inicializamos navigate

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [estado, setEstado] = useState(''); // '', 'ok', 'err'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
    setEstado('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setEstado('err');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error en el servidor');

      setEstado('ok');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      console.error(error);
      setEstado('err');
    }
  };

  return (
    <main>
      <form className="formulario-contacto" onSubmit={handleSubmit} onReset={handleReset}>
        <h2 className="formulario-titulo">Contacto</h2>


        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className={`Username ${formData.nombre ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
            }`}
        />
        {estado === 'err' && !formData.nombre && (
          <span className="error-message">Por favor ingresá tu nombre.</span>
        )}


        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          className={`Usermail ${formData.email ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
            }`}
        />
        {estado === 'err' && !formData.email && (
          <span className="error-message">Por favor ingresá un correo válido.</span>
        )}

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribí tu mensaje..."
          value={formData.mensaje}
          onChange={handleChange}
          className={`MensajedeContacto ${formData.mensaje ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
            }`}
        ></textarea>
        {estado === 'err' && !formData.mensaje && (
          <span className="error-message">El mensaje no puede estar vacío.</span>
        )}


        <div className="acciones-form">
          <div className="fila-botones">
            <button type="submit" className="boton_enviar">Enviar mensaje</button>
            <button type="reset" className="boton_resetear">Limpiar campos</button>
          </div>

          <button
            type="button"
            className="boton_volver"
            onClick={() => navigate('/productos')}
          >
            Volver al catálogo
          </button>
        </div>

        {estado === 'ok' && (
          <div id="form-feedback" className="ok">
            ¡Gracias por contactarnos! Te responderemos pronto.
          </div>
        )}
        {estado === 'err' && (
          <div id="form-feedback" className="err">
            Por favor completá todos los campos correctamente.
          </div>
        )}
      </form>
    </main>
  );
}