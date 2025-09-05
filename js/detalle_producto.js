// /js/producto.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM
    const imgEl    = document.getElementById('prod-img');
    const nombreEl = document.getElementById('prod-nombre');
    const descEl   = document.getElementById('prod-desc');
    const fichaEl  = document.getElementById('prod-ficha');
    const precioEl = document.getElementById('prod-precio');
    const btnAdd   = document.getElementById('btn-add');
    const badge    = document.getElementById('cart-count');
  
    //Utils
    const CLAVE_CARRITO = 'hj_cart_count';
    const aMonedaARS = (n) =>
      new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n);
  
    const refrescarContador = () => {
      if (!badge) return;
      const valor = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      badge.textContent = String(valor);
    };
    const sumarAlCarrito = () => {
      const actual = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      sessionStorage.setItem(CLAVE_CARRITO, String(actual + 1));
      refrescarContador();
    };
  
    // Obtener id de la URL
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
  
    // Buscar en la fuente global
    const getById = (pid) => {
      if (typeof window.getProductoById === 'function') return window.getProductoById(pid);
      return (window.CATALOGO || []).find(p => p.id === pid) || null;
    };
    const prod = getById(id);
  
    if (!prod) {
      // fallback si el id no existe o no cargó el catálogo
      nombreEl.textContent = 'Producto no encontrado';
      descEl.innerHTML = 'No pudimos cargar el detalle. Volvé al <a href="productos.html">catálogo</a>.';
      imgEl.src = '/media/logo.svg';
      imgEl.alt = 'Mueblería Hermanos Jota';
      btnAdd.disabled = true;
      refrescarContador();
      return;
    }
  
    // Pintar datos
    document.title   = `${prod.nombre} - Mueblería Hermanos Jota`;
    imgEl.src        = prod.img;
    imgEl.alt        = prod.nombre;
    nombreEl.textContent = prod.nombre;
    descEl.textContent   = prod.descripcion || 'Pieza de diseño artesanal, pensada para durar.';
    precioEl.textContent = `Precio: ${aMonedaARS(prod.precio)}`;
  
    // Ficha técnica (si hay datos, los listamos)
    if (Array.isArray(prod.ficha) && prod.ficha.length) {
      fichaEl.innerHTML = prod.ficha
        .map(item => `<li><strong>${item.label}:</strong> ${item.valor}</li>`)
        .join('');
    } else {
      fichaEl.innerHTML = '<li>—</li>';
    }
  
    // Carrito
    refrescarContador();
    btnAdd.addEventListener('click', sumarAlCarrito);
  });
  