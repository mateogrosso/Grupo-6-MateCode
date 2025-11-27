# E-commerce - Mueblería Hermanos Jota
## Grupo 6 - CodeMate

### Integrantes
*   Grosso, Mateo
*   Ferreyra, Tomás Alejo
*   Pereson, Mariano

---

## 🧾 Descripción del Proyecto

Este proyecto corresponde a la **Entrega Final (Sprints 7 y 8)** del e-commerce "Mueblería Hermanos Jota".
El objetivo principal de esta etapa fue transformar la aplicación en una plataforma completa y segura, implementando un **sistema de autenticación robusto (JWT)**, gestión de usuarios, rutas protegidas y un flujo de compra real con persistencia de pedidos en base de datos.

La aplicación opera como una **Single Page Application (SPA)** en React, consumiendo una API REST segura en Node.js + Express conectada a MongoDB Atlas.

### Deploys del Proyecto

*   **Frontend (React - Vercel):**
    [https://matecode-vercel.vercel.app](https://matecode-vercel.vercel.app)

*   **Backend (Express + MongoDB - Render):**
    [https://matecode-backend.onrender.com](https://matecode-backend.onrender.com)

---

## Tecnologías Utilizadas

### Frontend
*   **React.js** (Hooks, Context API para estado global)
*   **React Router DOM** (Rutas públicas y protegidas)
*   **Context API** (Gestión de Autenticación y Carrito)
*   **CSS Modules** (Diseño responsive y premium)
*   **Fetch API** (Consumo de endpoints seguros)

### Backend
*   **Node.js + Express**
*   **MongoDB Atlas + Mongoose** (Base de datos NoSQL)
*   **JWT (JSON Web Tokens)** (Autenticación segura)
*   **Bcrypt** (Hashing de contraseñas)
*   **Dotenv** (Variables de entorno)
*   **CORS** (Seguridad cross-origin)

---

## Instrucciones de Instalación y Ejecución local

### Backend
1.  Ir a la carpeta `backend/`
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo `.env` con el siguiente contenido:
    ```env
    PORT=4000
    MONGO_URI=mongodb+srv://<usuario>:<clave>@<cluster>.mongodb.net/muebleria
    JWT_SECRET=tu_clave_secreta_super_segura
    ```
4.  Ejecutar en desarrollo:
    ```bash
    npm run dev
    ```
    El servidor correrá en `http://localhost:4000`

### Frontend
1.  Ir a la carpeta `client/`
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Iniciar la app:
    ```bash
    npm start
    ```
    La SPA abrirá en `http://localhost:3000`

---

## 🔌 Backend — API REST Segura

El servidor implementa autenticación mediante **JWT**. Las rutas sensibles están protegidas por un middleware que verifica la validez del token.

### Endpoints Principales

| Método | Ruta | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `POST` | `/api/usuarios/register` | Registro de nuevos usuarios. | Público |
| `POST` | `/api/usuarios/login` | Inicio de sesión (devuelve JWT). | Público |
| `GET` | `/api/usuarios/profile` | Datos del usuario logueado. | **Privado** |
| **Productos** | | | |
| `GET` | `/api/productos` | Listado completo de productos. | Público |
| `GET` | `/api/productos/:id` | Detalle de un producto. | Público |
| `POST` | `/api/productos` | Crear nuevo producto. | Público (Admin) |
| **Pedidos** | | | |
| `POST` | `/api/orders` | Crear un nuevo pedido de compra. | **Privado** |
| `GET` | `/api/orders` | Ver historial de pedidos del usuario. | **Privado** |

### Middlewares de Seguridad
*   **authMiddleware.js**: Intercepta las peticiones a rutas protegidas, verifica el header `Authorization: Bearer <token>` y decodifica el usuario. Si el token es inválido o expiró, deniega el acceso (401/403).

---

## Funcionalidades Implementadas (Sprints 7 y 8)

### 1. Autenticación Completa
*   **Registro e Inicio de Sesión**: Formularios validados para crear cuenta e ingresar.
*   **Seguridad**: Las contraseñas se guardan encriptadas (hasheadas) en la base de datos usando `bcrypt`.
*   **Persistencia**: El usuario permanece logueado al recargar la página gracias al almacenamiento seguro del token.

### 2. Rutas Protegidas y Navegación Condicional
*   **Navbar Inteligente**: Muestra "Ingresar/Registrarse" si eres visitante, o tu "Nombre de Usuario" con un menú desplegable (Perfil, Mis Pedidos, Cerrar Sesión) si estás logueado.
*   **Protección de Rutas**: Intentar acceder a `/perfil`, `/mis-pedidos` o `/carrito` (para pagar) sin estar logueado redirige automáticamente al Login.

### 3. Gestión de Pedidos (Checkout)
*   **Carrito Persistente**: El estado del carrito se mantiene globalmente.
*   **Finalizar Compra**: Al confirmar la compra, se genera una orden en la base de datos asociada al usuario actual.
*   **Historial**: Los usuarios pueden ver sus compras anteriores en la sección "Mis Pedidos".

### 4. Panel de Administración (`/admin/crear-producto`)
*   Permite la carga de nuevos productos al catálogo, con campos detallados (precio, stock, imágenes, ficha técnica).