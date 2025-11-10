import React, { useState } from 'react';
// Importamos iconos para hacerlo más visual.
// Necesitarás instalar lucide-react: npm install lucide-react
import { LayoutDashboard, ShoppingCart, Package, DollarSign } from 'lucide-react';

/* --- Componente de Pestaña Reutilizable --- */
// Es buena práctica crear un componente para los botones de las pestañas
const TabButton = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 font-medium text-sm
        border-b-2 transition-all duration-150 ease-in-out
        focus:outline-none
        ${
          isActive
            ? 'border-blue-600 text-blue-600' // Estilo activo
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800' // Estilo inactivo
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

/* --- Componentes de Contenido para cada Pestaña --- */
// Estos son los componentes que se mostrarán cuando una pestaña esté activa.

// 1. Componente para el Formulario de Productos
const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    
    // Llama a la función del padre con el nuevo producto
    onAddProduct({ name, price: parseFloat(price) });
    
    // Limpia el formulario
    setName('');
    setPrice('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Agregar Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Manzana"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: 1.50"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold
                     hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

// 2. Componente para la Tabla de Productos
const ProductTable = ({ products }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Inventario</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No hay productos en la base de datos.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// 3. Contenido de la pestaña "Productos"
// Este componente "padre" maneja el estado de los productos
// y renderiza el formulario y la tabla.
const ProductosComponent = () => {
  // Datos iniciales (vendrían de tu BD)
  const [products, setProducts] =useState([
    { id: 1, name: 'Laptop Pro', price: 1499.99 },
    { id: 2, name: 'Mouse Inalámbrico', price: 39.50 },
    { id: 3, name: 'Teclado Mecánico', price: 120.00 },
  ]);

  // Función para agregar un producto (que pasamos al formulario)
  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; // Simula un ID único
    setProducts([...products, productWithId]);
    // Aquí también harías la llamada a tu API o BD para guardarlo
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna para el formulario */}
      <div className="lg:col-span-1">
        <ProductForm onAddProduct={handleAddProduct} />
      </div>
      {/* Columna para la tabla */}
      <div className="lg:col-span-2">
        <ProductTable products={products} />
      </div>
    </div>
  );
};

// 4. Contenido de la pestaña "Dashboard"
const DashboardComponent = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
      <p className="text-gray-600">
        Bienvenido al panel de control. Aquí irán tus estadísticas principales,
        gráficos de ventas y atajos.
      </p>
      {/* Aquí podrías agregar gráficas (ej. con Recharts) */}
    </div>
  );
};

// 5. Contenido de la pestaña "Ventas"
const VentasComponent = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Registro de Ventas</h2>
      <p className="text-gray-600">
        En esta sección se mostrará el historial de todas las ventas realizadas,
        con filtros por fecha, cliente, etc.
      </p>
      {/* Aquí iría una tabla de ventas */}
    </div>
  );
};


/* --- Componente Principal de la Aplicación --- */
// Este es el componente que une todo.
function App() {
  // Estado para saber qué pestaña está activa.
  // Empezamos en 'productos' por defecto.
  const [activeTab, setActiveTab] = useState('productos');

  return (
    // 1. El Contenedor General (centrado en la pantalla)
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter p-4">
      
      {/* 2. La "Caja" principal */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* 3. La barra de navegación con las pestañas */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <TabButton
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            isActive={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            label="Productos"
            icon={<Package size={18} />}
            isActive={activeTab === 'productos'}
            onClick={() => setActiveTab('productos')}
          />
          <TabButton
            label="Ventas"
            icon={<DollarSign size={18} />}
            isActive={activeTab === 'ventas'}
            onClick={() => setActiveTab('ventas')}
          />
          <TabButton
            label="Carrito"
            icon={<ShoppingCart size={18} />}
            isActive={activeTab === 'carrito'}
            onClick={() => setActiveTab('carrito')}
          />
        </div>

        {/* 4. El área de contenido (que cambia según la pestaña) */}
        <div className="p-6 md:p-8 bg-gray-50">
          {/* Renderizado Condicional */}
          {activeTab === 'dashboard' && <DashboardComponent />}
          {activeTab === 'productos' && <ProductosComponent />}
          {activeTab === 'ventas' && <VentasComponent />}
          {activeTab === 'carrito' && (
            <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu Carrito</h2>
              <p className="text-gray-600">
                Aquí irá el componente principal del carrito de compras.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;