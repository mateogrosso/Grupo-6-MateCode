export async function fetchProductos() {
  try {
    const response = await fetch('http://localhost:4000/api/productos');

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
  
