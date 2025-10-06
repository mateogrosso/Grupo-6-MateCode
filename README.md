# E-commerce - Mueblería Hermanos Jota  
# Grupo 6 - CodeMate  

---

## Integrantes
- Grosso, Mateo  
- Ferreyra, Tomás Alejo  
- Pereson, Mariano  
- García, Franco  

---

## Descripción del Proyecto
Este proyecto corresponde a la **Fase 2 (Sprints 3 y 4)** del e-commerce **Mueblería Hermanos Jota**.  
El objetivo fue reconstruir completamente la tienda digital utilizando tecnologías modernas del lado del cliente y del servidor:  
- **Frontend:** React.js (SPA con componentes reutilizables).  
- **Backend:** Node.js + Express (API REST propia).  

La aplicación ahora funciona como una **Single Page Application (SPA)** conectada a un **servidor Express** que provee los datos en formato JSON.  

---

## Instrucciones de Instalación y Ejecución

### Backend
1. Ir a la carpeta `backend/src/`  
2. Instalar dependencias `npm install`
3. Ejecutar el servidor con nodemon `npm run dev`
4. El servidor quedará corriendo en http://localhost:4000

### Frontend
1. Ir a la carpeta `client/src/`  
2. Instalar dependencias `npm install`
3. Iniciar la aplicación React `npm start`
4. La app abrirá automáticamente en http://localhost:3000

---

### Backend – API REST con Express
El servidor fue desarrollado con Node.js y Express, siguiendo buenas prácticas de modularización y middlewares.
## Endpoints disponibles

### 🌐 Endpoints disponibles

| Método | Ruta                         | Descripción |
|:--------|:-----------------------------|:-------------|
| **GET** | `/api/productos`             | Devuelve el listado completo de productos. |
| **GET** | `/api/productos/:id`         | Devuelve los datos de un producto específico según su ID. |
| **GET** | `/api/productos/destacados`  | Devuelve la lista de productos destacados. |
| **POST** | `/api/contacto`             | Recibe los datos del formulario de contacto enviados desde el frontend. |
| **(404)** | `*`                        | Respuesta del middleware `error404` para rutas inexistentes. |

## Middlewares
- **logger.js:** imprime en consola el método y URL de cada petición.
- **express.json():** permite procesar el cuerpo JSON de las peticiones POST.
- **error404.js:** captura rutas inexistentes y devuelve un mensaje de error 404.

---

## Funcionalidades Implementadas
- **Inicio (Home.jsx)**  
  - Hero banner con imagen principal.  
  - Sección de productos destacados obtenidos desde `/api/productos/destacados`.  
  - Contador de carrito sincronizado con `sessionStorage`.  

- **Catálogo (ProductList.jsx)**  
  - Render dinámico de todo el catálogo (`/api/productos`).  
  - Buscador de productos por nombre o descripción.  
  - Botón "Ver detalle" que navega al producto.  

- **Detalle (ProductDetail.jsx)**  
  - Información completa del producto seleccionado.  
  - Botón “Añadir al carrito” con cantidad configurable.  
  - Botón “Volver al catálogo”.  

- **Contacto (ContactForm.jsx)**  
  - Formulario controlado con validación en tiempo real.  
  - Envío al endpoint `/api/contacto`.  
  - Mensajes de error y confirmación en la interfaz.  

- **Carrito (estado global)**  
  - Estado manejado en `App.js`.  
  - Persistencia temporal con `sessionStorage`.  
  - Contador visible en el `Navbar.jsx`.  

---

## Arquitectura del Proyecto

```plaintext
Mueblería-Hermanos-Jota/
├── backend/              # Servidor Express
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   └── productos.controller.js
│   │   ├── routes/
│   │   │   └── productosRoutes.js
│   │   ├── data/
│   │   │   └── productos.js
│   │   └── middlewares/
│   │       ├── logger.js
│   │       └── error404.js
├── client/               # Aplicación React
│   ├── src/
│   │   ├── App.js
│   │   ├── index.jsx
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── Services/
│   │   │   └── ProductService.js
│   │   └── styles/
│   └── package.json
├── ETAPA_1/              # Versión inicial (HTML, CSS, JS puro)
└── README.md
