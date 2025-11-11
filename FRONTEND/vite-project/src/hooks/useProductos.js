import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const useProductos = () => {
    // A. Estado específico de ESTE hook
    const { authFetch, logout } = useContext(AuthContext);
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});

    // Fucniones para interactuar con la API

    // Función para OBTENER todos los productos (GET)
    const getAllProductos = useCallback(async () => {
        const response = await authFetch("/productos");
        if (response.status === 401) return logout();
        const data = await response.json();
        if (response.ok) setProductos(data);
    }, [authFetch, logout]);

    // Effect para cargar los productos al inicio
    useEffect(() => {
        getAllProductos();
    }, [getAllProductos]);

    // Función para OBTENER un producto por ID (GET)
const getProductoById = useCallback(async (id) => {
        const response = await authFetch(`/productos/${id}`); 
        if (response.status === 401) return logout();
        const data = await response.json();
        if (response.ok) setProducto(data);
    }, [authFetch, logout]);

    const createProducto = async (nuevoProducto) => {
        const response = await authFetch("/productos", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto),
        });
        if (response.status === 401) return logout();

        const data = await response.json();
        if (!response.ok) {
            alert(data.detail || "Error al crear");
            return false;
        }
        getAllProductos(); 
        return true;
    };

    // --- FUNCIÓN 'UPDATE' para Actualizar un producto ---
    const updateProducto = async (id, productoActualizado) => {
        const response = await authFetch(`/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado),
        });
        if (response.status === 401) return logout();

        const data = await response.json();
        if (!response.ok) {
            alert(data.detail || "Error al actualizar");
            return false;
        }
        getAllProductos();
        return true;
    }

    // Función para BORRAR un producto (DELETE)
    const deleteProducto = useCallback(async (id) => {
        const response = await authFetch(`/productos/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 401) return logout();

        const data = await response.json();
        if (!response.ok) {
            alert(data.detail || "Error al eliminar");
            return false;
        }
        getAllProductos(); // Recargar lista
        return true;
    }, [authFetch, logout, getAllProductos]);




    // G. Devolvemos todo lo que el componente necesita
    return {
        productos,
        producto,
        getAllProductos,
        getProductoById,
        createProducto,
        updateProducto,
        deleteProducto,
    };
};