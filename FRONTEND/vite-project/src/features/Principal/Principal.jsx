// src/pages/Dashboard.jsx
import { useState } from 'react';
import { LayoutDashboard, Package, Users, DollarSign } from 'lucide-react';
import TabButton from '../../components/TabButton/TabButton'; // Necesitamos este componente

// 1. Importamos el CONTENIDO de cada pestaña
import EmpleadosTab from '../Empleados/EmpleadosTab';
import CarritoTab from '../Carrito/CarritoTab';
import ProductosTab from '../Productos/ProductosTab';
import VentasTab from '../Ventas/VentasTab';

// --- COMPONENTE PRINCIPAL ---
function Principal() {
  // 1. Definimos las pestañas como datos
  const tabs = [
    { id: 'carrito', label: 'Carrito', icon: <LayoutDashboard size={18} /> },
    { id: 'productos', label: 'Productos', icon: <Package size={18} /> },
    { id: 'empleados', label: 'Empleados', icon: <Users size={18} /> },
    { id: 'ventas', label: 'Ventas', icon: <DollarSign size={18} /> },
  ];

  // 2. Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 3. Objeto "mapa" para el contenido
  //    ¡Aquí conectamos los componentes reales!
  const tabContent = {
    carrito: <CarritoTab />,
    productos: <ProductosTab />,
    empleados: <EmpleadosTab />,
    ventas: <VentasTab />,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Navegación de Pestañas */}
        <nav className="flex border-b border-gray-200 bg-gray-50">
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
        <main className="p-6 md:p-8 bg-gray-50">
          {tabContent[activeTab]}
        </main>
        
      </div>
    </div>
  );
}

export default Principal;