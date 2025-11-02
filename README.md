# E-commerce - Mueblería Hermanos Jota  
**Grupo 6 - CodeMate**

### Integrantes
- Grosso, Mateo  
- Ferreyra, Tomás Alejo  
- Pereson, Mariano  

---

## 🧾 Descripción del Proyecto

Este proyecto corresponde a la **Fase 3 (Sprints 5 y 6)** del e-commerce **Mueblería Hermanos Jota**.  
El objetivo fue **conectar la tienda digital a una base de datos real** (MongoDB Atlas) y **completar el ciclo CRUD** mediante una API REST propia desarrollada con Express.

La aplicación ahora está **desplegada en la nube**, funcionando como una **Single Page Application (SPA)** en React que consume los datos de un backend Node.js + Express conectado a MongoDB.

---

## Deploys del Proyecto
- **Frontend (React - Vercel):**  
  [https://matecode-vercel.vercel.app](https://matecode-vercel.vercel.app)

- **Backend (Express + MongoDB - Render):**  
  [https://matecode-backend.onrender.com](https://matecode-backend.onrender.com)

- En el frontend podés acceder al formulario de administración directamente:
https://matecode-vercel.vercel.app/admin/crear-producto

---

## Tecnologías Utilizadas

### Frontend
- React.js (SPA con componentes reutilizables)
- React Router DOM
- Fetch API para consumo del backend
- CSS y componentes modulares
- Despliegue en **Vercel**

### Backend
- Node.js + Express
- Mongoose (ODM para MongoDB Atlas)
- dotenv (manejo de variables de entorno)
- CORS (seguridad en peticiones)
- Despliegue en **Render**

### Base de Datos
- MongoDB Atlas (cluster gratuito en la nube)

---

### Instrucciones de Instalación y Ejecución local

### Backend
1. Ir a la carpeta `backend/`
2. Instalar dependencias  
   `npm install`
3. Crear archivo `.env`
  PORT=4000
  MONGO_URI=mongodb+srv://<usuario>:<clave>@<cluster>.mongodb.net/muebleria
  CLIENT_URL=http://localhost:3000
4. Ejecutar en desarrollo: `npm run dev`
5. El servidor quedará corriendo en http://localhost:4000
   
### Frontend
1. Ir a la carpeta client/
2. Instalar dependencias: `npm i`
3. Crear archivo `.env`
4. Inciar la app: `npm start server`
5. La SPA abrirá en http://localhost:3000

### Backend — API REST con Express
El servidor está desarrollado con Node.js + Express, siguiendo buenas prácticas de modularización y middlewares.

## Endpoints disponibles

| Método | Ruta | Descripción |
|:------:|:-----|:-------------|
| **GET** | `/api/productos` | Devuelve el listado completo de productos. |
| **GET** | `/api/productos/:id` | Devuelve los datos de un producto por su ID. |
| **GET** | `/api/productos/destacados` | Devuelve la lista de productos destacados. |
| **POST** | `/api/productos` | Crea un nuevo producto. |
| **PUT** | `/api/productos/:id` | Actualiza un producto existente. |
| **DELETE** | `/api/productos/:id` | Elimina un producto por su ID. |
| **POST** | `/api/contacto` | Recibe datos del formulario de contacto. |
| **(404)** | `*` | Middleware `error404` para rutas inexistentes. |



### Middlewares Principales
- express.json(): procesa el cuerpo JSON de las peticiones POST/PUT.
- cors(): permite solicitudes desde el frontend desplegado.
- logger.js: imprime en consola el método y URL de cada petición.
- error404.js: captura rutas inexistentes y devuelve un mensaje de error 404.

### Funcionalidades Implementadas
### Inicio (Home.jsx)
- Hero banner con imagen principal.
- Sección de productos destacados obtenidos desde /api/productos/destacados.
- Contador de carrito sincronizado con sessionStorage.

### Catálogo (ProductList.jsx)
- Render dinámico de todo el catálogo desde /api/productos.
- Buscador de productos por nombre o descripción.
- Botón “Ver detalle” que navega a la vista individual del producto.

### Detalle (ProductDetail.jsx)
- Muestra información completa del producto seleccionado.
- Botón “Añadir al carrito” con cantidad configurable.
- Botón “Volver al catálogo”.
- Panel de Administración

Podés acceder directamente al formulario para crear nuevos productos desde:
https://matecode-vercel.vercel.app/admin/crear-producto
