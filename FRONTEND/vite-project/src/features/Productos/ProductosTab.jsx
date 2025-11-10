import { useState } from 'react';

import { FormsProductos } from './components/FormProductos/FormsProductos'; // 2. Importas componentes
import { TablaProductos } from './components/TablaProductos/TablaProductos'; // 2. Importas componentes

const ProductosTab = ({
  productos,
  createProducto,
  deleteProducto
}) => {

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 4. Handler para seleccionar un producto de la tabla
  const handleSelectProducto = (producto) => {
    setProductoSeleccionado(producto);
    // Aquí puedes hacer que el formulario se llene con 'productoSeleccionado'
  };

  const handleClearSelection = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna para el formulario */}
      <div className="lg:col-span-1">
        {/* 5. Pasas la función 'createProducto' del hook al formulario */}
        <FormsProductos onSubmit={createProducto} />
      </div>

      {/* Columna para la tabla */}
      <div className="lg:col-span-2">
        <TablaProductos
          productos={productos}
          onProductoSelect={handleSelectProducto} // 6. Pasas el handler
        />
      </div>
    </div>
  );
};

export default ProductosTab;