// Define tu URL base en un solo lugar
const BASE_URL = 'https://api.tuproyecto.com/v1';

/**
 * Obtiene la lista de todos los productos
 */
export const getProductos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/productos`);
    
    if (!response.ok) {
      throw new Error('Error en la red al obtener productos');
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error en getProductos:', error);
    // Relanzamos el error para que el Hook lo capture
    throw error;
  }
};

/**
 * Crea un nuevo producto
 */
export const createProducto = async (nuevoProducto) => {
  try {
    const response = await fetch(`${BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Aquí iría tu Token de autenticación si lo tienes
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    
    return await response.json();

  } catch (error) {
    console.error('Error en createProducto:', error);
    throw error;
  }
};

// ...aquí podrías añadir updateProducto, deleteProducto, etc.