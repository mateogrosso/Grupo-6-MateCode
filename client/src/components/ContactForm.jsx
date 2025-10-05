import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/contacto.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [estado, setEstado] = useState(''); // '', 'ok', 'err'

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setEstado('err');
      return;
    }

    // Podrías reemplazar esto por un POST real a tu backend
    console.log('Formulario enviado:', formData);
    setEstado('ok');
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
    setEstado('');
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
          className={`Username ${
            formData.nombre ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
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
          className={`Usermail ${
            formData.email ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
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
          className={`MensajedeContacto ${
            formData.mensaje ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
          }`}
          placeholder="Escribí tu mensaje..."
          value={formData.mensaje}
          onChange={handleChange}
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
        </div>

        {/* Mensaje de estado */}
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
