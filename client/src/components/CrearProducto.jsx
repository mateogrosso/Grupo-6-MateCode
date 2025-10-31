import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/creacionProducto.css';
import { fetchCrearProducto } from '../services/ProductService';

export default function CrearProducto() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        img: "",
        href: "",
        destacado: false,
        descripcion: "",
        ficha: [],
    });

   
    const [cargando, setCargando] = useState(false);
    const [estado, setEstado] = useState(''); // '', 'ok', 'err
    
    const manejarCambio = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: type === 'radio' ? value === 'true' : value,
        }));
    };

    const manejarCambioFicha = (index, campo, valor) => {
        const nuevaFicha = [...form.ficha];
        nuevaFicha[index][campo] = valor;
        setForm((prev) => ({ ...prev, ficha: nuevaFicha }));
    };

    // Agregar una línea vacía en ficha
    const agregarFicha = () => {
        setForm((prev) => ({
            ...prev,
            ficha: [...prev.ficha, { label: "", valor: "" }],
        }));
    };

    // Eliminar una línea
    const eliminarFicha = (index) => {
        const nuevaFicha = form.ficha.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, ficha: nuevaFicha }));
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!form.id) {
            alert('El id es requerido');
            return;
        }
        if (!form.nombre) {
            alert('El nombre es requerido');
            return;
        }
        if (!form.precio) {
            alert('El precio es requerido');
            return;
        }
        if (!form.stock) {
            alert('El stock es requerido');
            return;
        }

        setCargando(true);

        try {
            await fetchCrearProducto(form);
            setEstado('ok');
            alert('El producto ha sido creado correctamente');
            navigate('/productos');
        } catch (error) {
            console.error(error);
            setEstado('err');
            alert('Hubo un error al crear el producto');
        } finally {
            setCargando(false);
        }
    };

    return (
        <form className="formulario-crearProducto" onSubmit={manejarEnvio}>
            <h2 className="formulario-titulo">Crear producto</h2>

            {/* ID */}
            <label htmlFor="id">ID</label>
            <input
                id="id"
                name="id"
                type="text"
                placeholder="ID del producto"
                value={form.id}
                onChange={manejarCambio}
                className={`Username ${form.id ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''
                    }`}
            />
            {estado === 'err' && !form.id && (
                <span className="error-message">El ID es requerido.</span>
            )}

            {/* Nombre */}
            <label htmlFor="nombre">Nombre</label>
            <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del producto"
                value={form.nombre}
                onChange={manejarCambio}
                className={`Username ${form.nombre ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''}`}
            />
            {estado === 'err' && !form.nombre && (
                <span className="error-message">El nombre es requerido.</span>
            )}

            {/* Precio */}
            <label htmlFor="precio">Precio</label>
            <input
                id="precio"
                name="precio"
                type="number"
                placeholder="Precio en ARS"
                value={form.precio}
                onChange={manejarCambio}
                className={`Usermail ${form.precio ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''}`}
            />
            {estado === 'err' && !form.precio && (
                <span className="error-message">El precio es requerido.</span>
            )}

            {/* Stock */}
            <label htmlFor="stock">Stock</label>
            <input
                id="stock"
                name="stock"
                type="number"
                placeholder="Cantidad en stock"
                value={form.stock}
                onChange={manejarCambio}
                className={`Usermail ${form.stock ? 'is-valid' : estado === 'err' ? 'is-invalid' : ''}`}
            />
            {estado === 'err' && !form.stock && (
                <span className="error-message">El stock es requerido.</span>
            )}

            {/* Imagen */}
            <label htmlFor="img">Imagen (URL)</label>
            <input
                id="img"
                name="img"
                type="text"
                placeholder="/media/..."
                value={form.img}
                onChange={manejarCambio}
                className="Usermail"
            />

            {/* Href */}
            <label htmlFor="href">Href (enlace)</label>
            <input
                id="href"
                name="href"
                type="text"
                placeholder="producto.html?id=..."
                value={form.href}
                onChange={manejarCambio}
                className="Usermail"
            />

            {/* Destacado */}
            <label>¿Producto destacado?</label>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="destacado"
                        value="true"
                        checked={form.destacado === true}
                        onChange={manejarCambio}
                    />
                    Sí
                </label>
                <label>
                    <input
                        type="radio"
                        name="destacado"
                        value="false"
                        checked={form.destacado === false}
                        onChange={manejarCambio}
                    />
                    No
                </label>
            </div>

            {/* Descripción */}
            <label htmlFor="descripcion">Descripción</label>
            <textarea
                id="descripcion"
                name="descripcion"
                rows="4"
                placeholder="Breve descripción del producto..."
                value={form.descripcion}
                onChange={manejarCambio}
                className="MensajedeDescripcion"
            ></textarea>

            {/* Ficha técnica */}
            <label>Ficha técnica (opcional)</label>
            <div className="ficha-container">
                {form.ficha.map((item, index) => (
                    <div className="ficha-item" key={index}>
                        <input
                            type="text"
                            placeholder="Etiqueta (ej: Materiales)"
                            value={item.label}
                            onChange={(e) => manejarCambioFicha(index, 'label', e.target.value)}
                            className="Usermail ficha-label"
                        />
                        <input
                            type="text"
                            placeholder="Valor (ej: Nogal macizo FSC®)"
                            value={item.valor}
                            onChange={(e) => manejarCambioFicha(index, 'valor', e.target.value)}
                            className="Usermail ficha-valor"
                        />
                        <button
                            type="button"
                            className="boton-eliminar-ficha"
                            onClick={() => eliminarFicha(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button type="button" className="boton-agregar-ficha" onClick={agregarFicha}>
                    + Agregar campo
                </button>
            </div>

            {/* Botones */}
            <div className="acciones-form">
                <div className="fila-botones">
                    <button type="submit" className="boton_enviar" disabled={cargando}>
                        {cargando ? 'Enviando...' : 'Crear producto'}
                    </button>
                    <button
                        type="button"
                        className="boton_resetear"
                        onClick={() =>
                            setForm({
                                id: '',
                                nombre: '',
                                precio: '',
                                stock: '',
                                img: '',
                                href: '',
                                destacado: false,
                                descripcion: '',
                                ficha: [],
                            })
                        }
                    >
                        Limpiar campos
                    </button>
                </div>

                <button
                    type="button"
                    className="boton_volver"
                    onClick={() => navigate('/productos')}
                >
                    Volver
                </button>
            </div>

            {/* Mostrar feedback */}
            {estado === 'ok' && (
                <div id="form-feedback" className="ok">
                    Producto creado correctamente.
                </div>
            )}
            {estado === 'err' && (
                <div id="form-feedback" className="err">
                    Por favor completá los campos obligatorios.
                </div>
            )}
        </form>
    );
}