import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const useProductos = () => {
    // A. Estado específico de ESTE hook
    const { authFetch, logout } = useContext(AuthContext);
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [isLoadingProductos, setIsLoadingProductos] = useState(false);
    const [errorProductos, setErrorProductos] = useState(null);


    // B. Usamos el hook genérico
    // Renombramos 'isLoading' y 'error' para que sean específicos


    // Función para OBTENER todos los productos (GET)
    const getAllProductos = async () => {
        setIsLoadingProductos(true);
        const response = await authFetch("/productos");
        if (response.status === 401) {
            logout();
            return;
        }
        const data = await response.JSON();
        if (data) {
            setProductos(data);
        }
        setIsLoadingProductos(false);
    };

    // Effect para cargar los productos al inicio
    useEffect(() => {
        getAllProductos();
    }, [getAllProductos]); // Se ejecuta 1 vez

    // Función para OBTENER un producto por ID (GET)
    const getProductoById = async (id) => {
        setIsLoadingProductos(true);
        const response = await authFetch(`/producto/${id}`);
        if (response.status === 401) {
            logout();
            return;
        }
        const data = await response.JSON();
        if (data) {
            setProducto(data);
        }
        setIsLoadingProductos(false);
    }

    // Función para CREAR un producto (POST)
    const createProducto = async (nuevoProducto) => {
        const response = await authFetch("/producto/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto),
        });

        const data = await response.JSON();

        if (data) {
            // Si fue exitoso, recargamos la lista
            setProducto(data);
            getAllProductos();
            return true; // Devolvemos éxito
        }
        alert(data.detail);
        return false; // Devolvemos fracaso
    }

    // Función para BORRAR un producto (DELETE)
    const deleteProducto = async (id) => {
        const response = await authFetch(`/producto/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        const data = await response.JSON();

        if (data) {
            // Si fue exitoso, recargamos la lista
            getAllProductos();
            return true; // Devolvemos éxito
        }
        alert(data.detail);
        return false; // Devolvemos fracaso
    }


    // G. Devolvemos todo lo que el componente necesita
    return {
        productos,
        producto,
        getAllProductos, // Para refrescar manualmente
        getProductoById,
        createProducto,
        deleteProducto,
    };
};