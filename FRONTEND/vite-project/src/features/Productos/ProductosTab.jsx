import { useState } from 'react';

import { FormsProductos } from './components/FormProductos/FormsProductos'; 
import { TablaProductos } from './components/TablaProductos/TablaProductos'; 

const ProductosTab = ({
  productos,
  createProducto,
  deleteProducto,
  updateProducto
}) => {

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Handler para seleccionar un producto de la tabla
  const handleSelectProducto = (producto) => {
    setProductoSeleccionado(producto);
    // Aquí puedes hacer que el formulario se llene con 'productoSeleccionado'
  };

  const handleClearSelection = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div>
      <div>
        <FormsProductos 
          onSubmit={createProducto} 
          onClear={handleClearSelection}
          productoParaEditar={productoSeleccionado} 
          onDelete={deleteProducto}
          onUpdate={updateProducto}
        />
      </div>

      <div>
        <TablaProductos
          productos={productos}
          onProductoSelect={handleSelectProducto}
        />
      </div>
    </div>
  );
};

export default ProductosTab;