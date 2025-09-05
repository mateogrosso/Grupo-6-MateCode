document.addEventListener('DOMContentLoaded', async () => {
    // DOM
    const contenedorProductos = document.getElementById('productos-grid');
    if (!contenedorProductos) return;
  
    const inputBuscador   = document.getElementById('buscador-producto');
    const badgeCarrito    = document.getElementById('cart-count');
    const CLAVE_CARRITO   = 'hj_cart_count';
  
    // Helpers
    const aMonedaARS = (n) =>
      new Intl.NumberFormat('es-AR', {
        style: 'currency', currency: 'ARS', maximumFractionDigits: 0
      }).format(n);
  
    const renderTarjetaProducto = (prod) => `
      <article class="producto-card">
        <img class="producto-img" loading="lazy" src="${prod.img}" alt="${prod.nombre}">
        <div class="producto-info">
          <h3 class="producto-title">${prod.nombre.toUpperCase()}</h3>
          <p class="producto-price">${aMonedaARS(prod.precio)}</p>
          <div class="producto-actions">
            <a class="btn-link" href="${prod.href}">Ver producto</a>
            <button class="btn-add" data-id="${prod.id}">Añadir</button>
          </div>
        </div>
      </article>
    `;
  
    const refrescarContador = () => {
      if (!badgeCarrito) return;
      const valor = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      badgeCarrito.textContent = String(valor);
    };
  
    const sumarAlCarrito = () => {
      const actual = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      const nuevo  = actual + 1;
      sessionStorage.setItem(CLAVE_CARRITO, String(nuevo));
      refrescarContador();
    };
  
    const normalizarTexto = (str) =>
      str.toLowerCase()
         .normalize('NFD')             // separa letras y acentos
         .replace(/[\u0300-\u036f]/g, ''); // remueve diacríticos
  
    const renderProductos = (lista) => {
      if (!lista.length) {
        contenedorProductos.innerHTML = `
          <p style="padding:.75rem 1rem; background:#FFF7EE; border:1px solid #E6D6C9; border-radius:10px; color:#7A3E22;">
            No se encontraron productos.
          </p>`;
        return;
      }
      contenedorProductos.innerHTML = lista.map(renderTarjetaProducto).join('');
    };
  
    // “Fetch” simulado del catálogo global 
      const traerCatalogo = () =>
      new Promise((ok) => setTimeout(() => ok(window.CATALOGO || []), 400));
    // const traerCatalogo = () => new Promise((resolve, reject) => {
    //   setTimeout(() => { 
    //     if (window.CATALOGO) {
    //       resolve(window.CATALOGO);
    //     } else {
    //       reject(new Error("No se encontró el catálogo"));
    //     }
    //   }, 400);
    // });
  
    // Flujo principal 
    try {
      const catalogo = await traerCatalogo();
      renderProductos(catalogo);
      refrescarContador();
  
      // Delegación: Añadir al carrito
      contenedorProductos.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add');
        if (btn) sumarAlCarrito();
      });
  
      // Buscador 
      inputBuscador.addEventListener('input', () => {
        const q = normalizarTexto(inputBuscador.value.trim());
        if (q === '') {
          renderProductos(catalogo);
          return;
        }
        const filtrados = catalogo.filter(p => normalizarTexto(p.nombre).includes(q));
        renderProductos(filtrados);
      });
  
    } catch (err) {
      console.error('Error cargando catálogo:', err);
      contenedorProductos.innerHTML = `
        <p style="color:#7A3E22; background:#FFF0F0; border:1px solid #C47A6D; border-left:4px solid #C47A6D; padding:12px; border-radius:10px;">
          No pudimos cargar los productos. Probá recargar la página.
        </p>`;
    }
  });