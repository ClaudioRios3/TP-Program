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

    console.log("Producto seleccionado", producto)
  };

  const handleClearSelection = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div>
      <div>
        <FormsProductos onSubmit={createProducto} />
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