document.addEventListener('DOMContentLoaded', async () => {
  //Referencias del DOM 
  const contenedorDestacados = document.getElementById('destacados-grid'); // contenedor de tarjetas
  if (!contenedorDestacados) return; // si no existe, no seguimos

  const badgeCarrito  = document.getElementById('cart-count'); // numero del carrito
  const CLAVE_CARRITO = 'hj_cart_count';                       // clave usada en sessionStorage

  //Helpers visuales
  //Formatea número a moneda ARS
  const aMonedaARS = (n) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

  // Devuelve el HTML de UNA tarjeta (producto destacado)
  const renderTarjetaProducto = (prod) => `
    <article class="destacados-card">
      <img class="destacados-img" loading="lazy" src="${prod.img}" alt="${prod.nombre}">
      <div class="destacados-info">
        <h3 class="destacados-title">${prod.nombre.toUpperCase()}</h3>
        <p class="destacados-price">${aMonedaARS(prod.precio)}</p>
        <div class="destacados-actions">
          <a class="btn-link" href="${prod.href}">Ver producto</a>
          <!-- Botón que suma al carrito -->
          <button class="btn-add" data-id="${prod.id}">Añadir</button>
        </div>
      </div>
    </article>
  `;

  // Helpers del carrito
  // Lee el valor guardado y lo pinta en el badge (si existe)
  const refrescarContadorCarrito = () => {
    if (!badgeCarrito) return;
    const valor = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
    badgeCarrito.textContent = String(valor);
  };

  // Suma 1 al carrito y refresca el badge
  const sumarAlCarrito = () => {
    const actual = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
    const nuevo  = actual + 1;
    sessionStorage.setItem(CLAVE_CARRITO, String(nuevo));
    refrescarContadorCarrito();
  };

  // Tomamos los destacados desde la FUENTE GLOBAL (/js/data/catalogo.js).
  // Si no existiera window.getDestacados, tomamos los primeros 4 del catálogo.
  const obtenerDestacados = () => {
    if (typeof window.getDestacados === 'function') {
      return window.getDestacados();
    }
    return (window.CATALOGO || []).slice(0, 4);
  };


    const traerDestacados = () => new Promise((resolve, reject) => {
       setTimeout(() => { 
         const lista = obtenerDestacados();
         if (lista && lista.length>0) {
           resolve(lista);
         } else {
           reject(new Error("No se encontró el catálogo"));
         }
       }, 400);
     });

  // Flujo principal: traigo → renderizo → engancho eventos
  try {
    // “Pido” los destacados (async/await)
    const listaDestacados = await traerDestacados();

    // Renderizamos todas las tarjetas de una
    contenedorDestacados.innerHTML = listaDestacados.map(renderTarjetaProducto).join('');

    // Al cargar la página, pinto el número del carrito
    refrescarContadorCarrito();

    // Si se hace click en un .btn-add dentro del contenedor, sumo al carrito
    contenedorDestacados.addEventListener('click', (evento) => {
      const botonSumar = evento.target.closest('.btn-add');
      if (!botonSumar) return;

      sumarAlCarrito();
    });
  } catch (err) {
    // En caso de algún fallo (no debería pasar en el simulacro), informamos en pantalla
    console.error('Error cargando destacados:', err);
    contenedorDestacados.innerHTML = `
      <p style="color:#7A3E22; background:#FFF0F0; border:1px solid #C47A6D; border-left:4px solid #C47A6D; padding:12px; border-radius:10px;">
        No pudimos cargar los destacados. Probá recargar la página.
      </p>
    `;
  }
});
