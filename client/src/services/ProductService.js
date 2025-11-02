const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

//Fetch a todos los productos
export async function fetchProductos() {
  try {
    const response = await fetch(`${API_URL}/api/productos`);

    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }

    const data = await response.json();

    // Verificamos si el backend devuelve un array directo o un objeto y ajustamos dependiendo lo que corresponda
    if (Array.isArray(data)) {
      return data;
    } else if (data.productos) {
      return data.productos;
    } else {
      console.error('Formato de datos inesperado:', data);
      return [];
    }
  } catch (error) {
    console.error('Error en fetchProductos:', error);
    throw error;
  }
}
  
//Fetch a producto por ID
export async function fetchProductoById(id) {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`);

    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
}

//Fetch a productos destacados
export async function fetchProductosDestacados() {
  try {
    const res = await fetch(`${API_URL}/api/productos/destacados`);

    if (!res.ok) {
      throw new Error("Error al cargar los productos destacados");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato de datos inesperado en destacados");
    }

    return data;
  } catch (error) {
    console.error("Error en fetchProductosDestacados:", error);
    throw error;
  }
}

// Fetch a producto con ID para eliminarlo
export async function fetchEliminarProducto(id) {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    throw error;
  }
}

export async function fetchCrearProducto(producto) {
  try {
    const response = await fetch(`${API_URL}/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en crearProducto:', error);
    throw error;
  }
}