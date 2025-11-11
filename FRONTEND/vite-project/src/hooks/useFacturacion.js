import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { AuthContext } from "../auth/AuthContext";

export const useFacturacion = () => {
  const { authFetch, logout } = useContext(AuthContext);
  
  // 1. Todo el estado del servidor y de la lógica de negocio
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [productos, setProductos] = useState([]);
  const [items, setItems] = useState([]);
  const facturaIdRef = useRef(null);

  // (Opcional) Puedes añadir estados de carga
  const [loading, setLoading] = useState({ clientes: true, productos: true });

  // 2. Todas las funciones de API (envueltas en useCallback)

  const getClientes = useCallback(async () => {
    setLoading(prev => ({ ...prev, clientes: true }));
    try {
      const response = await authFetch("/clientes");
      if (response.status === 401) return logout();
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error getClientes:", error);
    } finally {
      setLoading(prev => ({ ...prev, clientes: false }));
    }
  }, [authFetch, logout]);

  const getProductos = useCallback(async () => {
    setLoading(prev => ({ ...prev, productos: true }));
    try {
      const response = await authFetch("/productos");
      if (response.status === 401) return logout();
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error getProductos:", error);
    } finally {
      setLoading(prev => ({ ...prev, productos: false }));
    }
  }, [authFetch, logout]);

  const getFacturaId = useCallback(async (clienteId) => {
    try {
      const response = await authFetch(`/factura/${clienteId}`);
      if (response.status === 401) return logout();
      const data = await response.json();
      facturaIdRef.current = data;
    } catch (error) {
      console.error("Error getFacturaId:", error);
    }
  }, [authFetch, logout]);

  const addItem = useCallback(async (parametros) => {
    try {
      const response = await authFetch("/detalle/agregar-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametros),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return logout();
      }
      setItems(data);
      getProductos(); // Recargamos productos (quizás por el stock)
    } catch (error) {
      console.error("Error addItem:", error);
    }
  }, [authFetch, logout, getProductos]);

  const removeItem = useCallback(async (item) => {
    const parametros = {
      facturaId: item.factura_id,
      productoId: item.producto_id,
    };
    try {
      const response = await authFetch("/detalle/quitar-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametros),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return logout();
      }
      setItems(data);
      getProductos(); // Recargamos productos
    } catch (error) {
      console.error("Error removeItem:", error);
    }
  }, [authFetch, logout, getProductos]);

  // 3. Efecto inicial para cargar datos
  useEffect(() => {
    getClientes();
    getProductos();
  }, [getClientes, getProductos]); // Se ejecuta 1 vez

  // 4. Handlers (manejadores) que el componente usará
  const selectCliente = useCallback((cliente) => {
    setCliente(cliente);
    getFacturaId(cliente.id);
  }, [getFacturaId]);
  
  const submitItem = useCallback((productoId, cantidad) => {
    addItem({
      facturaId: facturaIdRef.current,
      productoId: productoId,
      cantidad: cantidad,
    });
  }, [addItem]);

  const resetFactura = useCallback(() => {
    setCliente({});
    setItems([]);
    facturaIdRef.current = null;
  }, []);

  // 5. Devolvemos el estado y las funciones que el componente necesita
  return {
    clientes,
    cliente,
    productos,
    items,
    loading,
    logout, // Devolvemos logout para el botón
    
    // Handlers
    selectCliente,
    submitItem,
    removeItem,
    resetFactura,
  };
};