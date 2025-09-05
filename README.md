# E-commerce - Mueblería Hermanos Jota
# Grupo 6 - CodeMate

## Integrantes
- [Ballardini, Florencia]  
- [Ferreyra. Tomás Alejo]  
- [García, Franco]  
- [Grosso, Mateo]  
- [Pereson, Mariano]  

---

## Descripción del Proyecto
Este proyecto corresponde a la **Fase 1 del e-commerce de Mueblería Hermanos Jota**.  
El objetivo fue construir la **fachada digital** de la tienda: un sitio web responsive que permita a los usuarios explorar productos, ver detalles individuales, simular la selección en un carrito y contactarse a través de un formulario.  

Toda la lógica se implementa con **tecnologías del lado del cliente** (HTML, CSS y JavaScript), sin conexión a un backend.  

---

## Funcionalidades Implementadas
- **Página de Inicio (index.html)**  
  - Hero banner con imágenes destacadas.  
  - Sección de productos destacados cargados dinámicamente con JavaScript.  
  - Contador de carrito en el header.  

- **Catálogo de Productos (productos.html)**  
  - Render dinámico de todo el catálogo desde un array de objetos.  
  - Búsqueda de productos.  
  - Botón de añadir al carrito con persistencia en `localStorage`.  

- **Detalle de Producto (producto.html)**  
  - Vista individual con imagen, descripción, precio.  

- **Contacto (contacto.html)**  
  - Formulario con validación en tiempo real (nombre, email y mensaje).  
  - Mensajes de error accesibles y confirmación de envío en el DOM.  

- **Carrito Simulado (global)**  
  - Cada botón **"Añadir"** incrementa un contador visible en el header.  
  - El valor se guarda en `localStorage` para persistencia entre páginas.  

---

## Tecnologías Utilizadas
- **HTML5** → estructura semántica de todas las páginas:contentReference[oaicite:0]{index=0}.  
- **CSS3** → estilos responsivos, flexbox, grid, sombras y gradientes:contentReference[oaicite:1]{index=1}.  
- **JavaScript (ES6+)** → lógica de interactividad, render dinámico de productos, manejo del carrito y validación de formularios:contentReference[oaicite:2]{index=2}.  
- **LocalStorage** → simulación de persistencia para el carrito.  

---

## Estructura Principal
- `index.html` → Inicio con productos destacados.  
- `productos.html` → Catálogo dinámico.  
- `producto.html` → Detalle de un producto.  
- `contacto.html` → Formulario validado con JS.  
- `/css/` → Hojas de estilos globales y específicos de cada html.  
- `/js/` → Scripts de lógica para cada sección.  
- `/media/` → Recursos de imágenes y logo.  
