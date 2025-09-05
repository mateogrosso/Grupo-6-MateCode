//Home: carga los "Productos Destacados" y maneja el contador del carrito
document.addEventListener('DOMContentLoaded', async () => {
    // Referencias del DOM 
    const contenedorDestacados = document.getElementById('destacados-grid'); // donde pintamos las tarjetas
    if (!contenedorDestacados) return; // si no existe el contenedor, no hacemos nada en esta página
  
    const badgeCarrito = document.getElementById('cart-count'); // numerito del carrito en el header
    const CLAVE_CARRITO = 'hj_cart_count'; // key que usamos en localStorage
  
    //Datos locales: array de objetos (como pide la consigna)
    const productosDestacados = [
      {
        id: 'copacabana',
        nombre: 'Sillón Copacabana',
        precio: 199990,
        img: '/media/Sillón Copacabana.png',
        href: 'producto.html?id=copacabana'
      },
      {
        id: 'costa',
        nombre: 'Escritorio Costa',
        precio: 374990,
        img: '/media/Escritorio Costa.png',
        href: 'producto.html?id=costa'
      },
      {
        id: 'patagonia',
        nombre: 'Sofá Patagonia',
        precio: 699990,
        img: '/media/Sofá Patagonia.png',
        href: 'producto.html?id=patagonia'
      },
      {
        id: 'recoleta',
        nombre: 'Biblioteca Recoleta',
        precio: 349990,
        img: '/media/Biblioteca Recoleta.png',
        href: 'producto.html?id=recoleta'
      }
    ];
  
    //Utilidades
    //Formatea números como ARS
    const aMonedaARS = (n) =>
      new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'ARS', 
        maximumFractionDigits: 0 
      }).format(n);
  
    // Devuelve el HTML de UNA tarjeta de producto destacado
    const renderTarjetaProducto = (prod) => `
      <article class="destacados-card">
        <img class="destacados-img" loading="lazy" src="${prod.img}" alt="${prod.nombre}">
        <div class="destacados-info">
          <h3 class="destacados-title">${prod.nombre.toUpperCase()}</h3>
          <p class="destacados-price">${aMonedaARS(prod.precio)}</p>
          <div class="destacados-actions">
            <a class="btn-link" href="${prod.href}">Ver producto</a>
            <!-- Este botón es el que suma al carrito -->
            <button class="btn-add" data-id="${prod.id}">Añadir</button>
          </div>
        </div>
      </article>
    `;
  
    // Pinta en el badge el valor actual guardado en localStorage
    const refrescarContadorCarrito = () => {
      if (!badgeCarrito) return;
      const valor = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      badgeCarrito.textContent = String(valor);
    };
  
    // Suma 1 al carrito y actualiza el badge
    const sumarAlCarrito = () => {
      const actual = Number(sessionStorage.getItem(CLAVE_CARRITO) || 0);
      const nuevo = actual + 1;
      sessionStorage.setItem(CLAVE_CARRITO, String(nuevo));
      refrescarContadorCarrito();
    };
  
    // Simulación asíncrona de "traer datos" 
    // Usamos setTimeout con una Promesa para emular una demora de red (400ms).
    const traerDestacados = () =>
      new Promise((resolver) => {
        setTimeout(() => resolver(productosDestacados), 400);
      });
  
    // Ciclo principal: traigo → renderizo → engancho eventos
    try {
      // 1) "Pido" los destacados (async/await)
      const lista = await traerDestacados();
  
      // 2) Render en el DOM (generamos el HTML de todas las tarjetas y lo metemos de una)
      contenedorDestacados.innerHTML = lista.map(renderTarjetaProducto).join('');
  
      // 3) Refresco el contador del carrito apenas carga la página
      refrescarContadorCarrito();
  
      // 4) Delegación de eventos: escucho clicks dentro del contenedor,
      //    si el click vino de un botón .btn-add, sumo al carrito.
      contenedorDestacados.addEventListener('click', (evento) => {
        const botonSumar = evento.target.closest('.btn-add');
        if (!botonSumar) return;
        
        sumarAlCarrito();
      });
    } catch (error) {
      // Si algo falla, mostramos un mensaje
      console.error('Error cargando destacados:', error);
      contenedorDestacados.innerHTML = `
        <p style="color:#7A3E22; background:#FFF0F0; border:1px solid #C47A6D; border-left:4px solid #C47A6D; padding:12px; border-radius:10px;">
          No pudimos cargar los destacados. Probá con recargar la página.
        </p>
      `;
    }
  });
  