import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/contacto.css';

export default function ContactForm({ onGoBack }) {
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

        {/* Nombre */}
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className={`Username ${
            formData.nombre ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
        />
        {estado === 'err' && !formData.nombre && (
          <span className="error-message">Por favor ingresá tu nombre.</span>
        )}

        {/* Email */}
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          className={`Usermail ${
            formData.email ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
        />
        {estado === 'err' && !formData.email && (
          <span className="error-message">Por favor ingresá un correo válido.</span>
        )}

        {/* Mensaje */}
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribí tu mensaje..."
          value={formData.mensaje}
          onChange={handleChange}
          className={`MensajedeContacto ${
            formData.mensaje ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
        ></textarea>
        {estado === 'err' && !formData.mensaje && (
          <span className="error-message">El mensaje no puede estar vacío.</span>
        )}

        {/* Botones */}
        <div className="acciones-form">
          <button type="submit" className="boton_enviar">
            Enviar mensaje
          </button>
          <button type="reset" className="boton_resetear">
            Limpiar campos
          </button>
          <button type="button" className="boton_volver" onClick={onGoBack}>
            Volver al catálogo
          </button>
        </div>

        {/* Estado */}
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
