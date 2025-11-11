// src/pages/Dashboard.jsx
import { useState } from 'react';
import { ShoppingCart, Package, Users, DollarSign } from 'lucide-react';
import styles from './VentanaPrincipal.module.css';

// Import de Hooks
import { useProductos } from '../../hooks/useProductos'; 
// import { useEmpleados } from '../../hooks/useEmpleados'; 
// import { useVentas } from '../../hooks/useVentas';

// Import de Componentes
import TabButton from '../../components/TabButton/TabButton'; // Necesitamos este componente

// 1. Import del CONTENIDO de cada pestaña
import EmpleadosTab from '../Empleados/EmpleadosTab';
import CarritoTab from '../Carrito/CarritoTab';
import ProductosTab from '../Productos/ProductosTab';
import VentasTab from '../Ventas/VentasTab';

// --- COMPONENTE PRINCIPAL ---
function VentanaPrincipal() {

  // 1. Consumimos los hooks necesarios
 const { 
      productos,
      createProducto,
      deleteProducto,
      updateProducto
    } = useProductos();

  // 2. Definimos las pestañas como datos
  const tabs = [
    { id: 'carrito', label: 'Carrito', icon: <ShoppingCart size={18} /> },
    { id: 'productos', label: 'Productos', icon: <Package size={18} /> },
    { id: 'empleados', label: 'Empleados', icon: <Users size={18} /> },
    { id: 'ventas', label: 'Ventas', icon: <DollarSign size={18} /> },
  ];

  // 3. Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 3. Objeto "mapa" para el contenido
  const tabContent = {
    carrito: <CarritoTab />,
    productos: (
          <ProductosTab 
            productos={productos} 
            createProducto={createProducto}
            deleteProducto={deleteProducto}
            updateProducto={updateProducto}
          />),
    empleados: <EmpleadosTab />,
    ventas: <VentasTab />,
  };

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.tabContainer}>
        
        {/* Navegación de Pestañas */}
        <nav className={styles.tabNav}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>

        {/* Contenido de la Pestaña Activa */}
        <main className={styles.tabContent}>
          {tabContent[activeTab]}
        </main>
        
      </div>
    </div>
  );
}

export default VentanaPrincipal;