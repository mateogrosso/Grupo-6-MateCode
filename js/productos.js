document.addEventListener('DOMContentLoaded', async () => {
    // Referencias del DOM 
    const contenedorProductos = document.getElementById('productos-grid'); // donde pintamos las tarjetas
    if (!contenedorProductos) return; // si no existe el contenedor, no hacemos nada en esta página

    const badgeCarrito = document.getElementById('cart-count');
    const CLAVE_CARRITO = 'hj_cart_count';

    const catalogoProductos = [
        {
            id: 'uspallata',
            nombre: 'Aparador Uspallata',
            precio: 99990,
            img: '/media/Aparador Uspallata.png',
            href: 'producto.html?id=uspallata'
        },
        {
            id: 'recoleta',
            nombre: 'Biblioteca Recoleta',
            precio: 349990,
            img: '/media/Biblioteca Recoleta.png',
            href: 'producto.html?id=recoleta'
        },
        {
            id: 'mendoza',
            nombre: 'Butaca Mendoza',
            precio: 149990,
            img: '/media/Butaca Mendoza.png',
            href: 'producto.html?id=mendoza'
        },
        {
            id: 'costa',
            nombre: 'Escritorio Costa',
            precio: 374990,
            img: '/media/Escritorio Costa.png',
            href: 'producto.html?id=costa'
        },
        {
            id: 'pampa',
            nombre: 'Mesa Comedor Pampa',
            precio: 49990,
            img: '/media/Mesa Comedor Pampa.png',
            href: 'producto.html?id=pampa'
        },
        {
            id: 'araucaria',
            nombre: 'Mesa de Centro Araucaria',
            precio: 69990,
            img: '/media/Mesa de Centro Araucaria.png',
            href: 'producto.html?id=araucaria'
        },
        {
            id: 'aconcagua',
            nombre: 'Mesa de Noche Aconcagua',
            precio: 59990,
            img: '/media/Mesa de Noche Aconcagua.png',
            href: 'producto.html?id=aconcagua'
        },
        {
            id: 'belgrano',
            nombre: 'Silla de Trabajo Belgrano',
            precio: 299990,
            img: '/media/Silla de Trabajo Belgrano.png',
            href: 'producto.html?id=belgrano'
        },
        {
            id: 'cordoba',
            nombre: 'Sillas Córdoba',
            precio: 149990,
            img: '/media/Sillas Córdoba.png',
            href: 'producto.html?id=cordoba'
        },
        {
            id: 'copacabana',
            nombre: 'Sillón Copacabana',
            precio: 199990,
            img: '/media/Sillón Copacabana.png',
            href: 'producto.html?id=copacabana'
        },
        {
            id: 'patagonia',
            nombre: 'Sofá Patagonia',
            precio: 699990,
            img: '/media/Sofá Patagonia.png',
            href: 'producto.html?id=patagonia'
        }
    ];

    //Formatea números como ARS
    const aMonedaARS = (n) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(n);

    /*HTML de UNA tarjeta del catalogo de productos*/

    const renderTarjetaProducto = (prod) => `
      <article class="producto-card">
        <img class="producto-img" loading="lazy" src="${prod.img}" alt="${prod.nombre}">
        <div class="producto-info">
          <h3 class="producto-title">${prod.nombre.toUpperCase()}</h3>
          <p class="producto-price">${aMonedaARS(prod.precio)}</p>
          <div class="producto-actions">
            <a class="btn-link" href="${prod.href}">Ver producto</a>
            <!-- Este botón es el que suma al carrito -->
            <button class="btn-add" data-id="${prod.id}">Añadir</button>
          </div>
        </div>
      </article>
    `;

    const refrescarContadorCarrito = () => {
        if (!badgeCarrito) return;
        const valor = Number(localStorage.getItem(CLAVE_CARRITO) || 0);
        badgeCarrito.textContent = String(valor);
    };

    // Suma 1 al carrito y actualiza el badge
    const sumarAlCarrito = () => {
        const actual = Number(localStorage.getItem(CLAVE_CARRITO) || 0);
        const nuevo = actual + 1;
        localStorage.setItem(CLAVE_CARRITO, String(nuevo));
        refrescarContadorCarrito();
    };

    // Simulación asíncrona de "traer datos" 
    // Usamos setTimeout con una Promesa para emular una demora de red (400ms).
    const traerCatalogo = () =>
        new Promise((resolver) => {
            setTimeout(() => resolver(catalogoProductos), 400);
        });

    // Ciclo principal: traigo → renderizo → engancho eventos
    try {
        // 1) "Pido" los destacados (async/await)
        const lista = await traerCatalogo();

        // 2) Render en el DOM (generamos el HTML de todas las tarjetas y lo metemos de una)
        contenedorProductos.innerHTML = lista.map(renderTarjetaProducto).join('');

        // 3) Refresco el contador del carrito apenas carga la página
        refrescarContadorCarrito();

        // 4) Delegación de eventos: escucho clicks dentro del contenedor,
        contenedorProductos.addEventListener('click', (evento) => {
            const botonSumar = evento.target.closest('.btn-add');
            if (!botonSumar) return;

            sumarAlCarrito();
        });
    } catch (error) {
        console.error('Error cargando destacados:', error);
        contenedorProductos.innerHTML = `
        <p style="color:#7A3E22; background:#FFF0F0; border:1px solid #C47A6D; border-left:4px solid #C47A6D; padding:12px; border-radius:10px;">
          No pudimos cargar los productos. Probá con recargar la página.
        </p>
      `;
    }
});
