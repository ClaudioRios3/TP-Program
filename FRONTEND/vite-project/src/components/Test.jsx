import React, { useState } from 'react';

// --- Contenido para la Pestaña "Dashboard" ---
function DashboardTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Bienvenido al Dashboard</h3>
      <p className="mt-2 text-gray-600">
        Aquí puedes ver un resumen de tu actividad.
      </p>
      {/* Aquí podrías agregar gráficas o estadísticas */}
    </div>
  );
}

// --- Contenido para la Pestaña "Productos" ---
// Esto es básicamente tu componente "ShoppingCart" de antes
function ProductosTab() {
  // El estado de los productos vive *dentro* de esta pestaña
  const [products, setProducts] = useState([
    { name: 'Producto de Ejemplo', price: 10.99 }
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Gestión de Productos</h3>
      <p className="mt-2 mb-4 text-gray-600">
        Añade nuevos productos al inventario.
      </p>
      {/* Pasamos la función 'handleAddProduct' al formulario
        y la lista 'products' a la tabla.
      */}
      <ProductForm onAddProduct={handleAddProduct} />
      <hr className="my-6" />
      <ProductTable products={products} />
    </div>
  );
}

// --- Contenido para la Pestaña "Empleados" ---
function EmpleadosTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Gestión de Empleados</h3>
      <p className="mt-2 text-gray-600">
        Administra los roles y permisos de tu equipo.
      </p>
    </div>
  );
}

// --- Contenido para la Pestaña "Ventas" ---
function VentasTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Reporte de Ventas</h3>
      <p className="mt-2 text-gray-600">
        Visualiza el historial de ventas y reportes.
      </p>
    </div>
  );
}


// --- Componentes del Carrito (usados por ProductosTab) ---

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || price <= 0) {
      alert("Por favor, introduce un nombre y un precio válido.");
      return;
    }
    onAddProduct({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0.01"
        step="0.01"
        className="w-full sm:w-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <button 
        type="submit" 
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Agregar
      </button>
    </form>
  );
}

function ProductTable({ products }) {
  if (products.length === 0) {
    return <p className="text-gray-500 italic">No hay productos en la tabla.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// --- El Componente Principal (El Box Centrado) ---

export default function App() {
  // 1. Definimos las pestañas disponibles
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'productos', label: 'Productos' },
    { id: 'empleados', label: 'Empleados' },
    { id: 'ventas', label: 'Ventas' },
  ];

  // 2. Estado para saber qué pestaña está activa
  // Empezamos con la primera pestaña: 'dashboard'
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 3. Objeto para "mapear" el ID de la pestaña a su componente
  const tabContent = {
    dashboard: <DashboardTab />,
    productos: <ProductosTab />,
    empleados: <EmpleadosTab />,
    ventas: <VentasTab />,
  };

  return (
    // Fondo gris que ocupa toda la pantalla
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      {/* El "Box" blanco centrado */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Navegación de Pestañas */}
        <nav className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-6 font-medium text-sm focus:outline-none
                ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600' // Estilo de la pestaña activa
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50' // Estilo de las inactivas
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Contenido de la Pestaña Activa */}
        <main className="p-6 md:p-8">
          {/* Aquí ocurre la magia: 
            Muestra el componente que corresponde a la pestaña activa
          */}
          {tabContent[activeTab]}
        </main>
        
      </div>
    </div>
  );
}