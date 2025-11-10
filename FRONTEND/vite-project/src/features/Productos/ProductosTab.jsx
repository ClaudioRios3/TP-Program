import { useProductos } from '../../hooks/useProductos'; // 1. Importas tu hook
import { FormsProductos } from './components/FormProductos/FormsProductos'; // 2. Importas componentes
import { TablaProductos } from './components/TablaProductos/TablaProductos'; // 2. Importas componentes

const ProductosTab = () => {
  
  // 3. ¡Consumes el hook!
  const { 
    productos,
    isLoadingProductos,
    errorProductos,
    createProducto,
    deleteProducto 
    // (necesitarás 'updateProducto' también)
  } = useProductos();

  // 4. Manejas los estados de UI
  if (isLoadingProductos) {
    return <div>Cargando productos...</div>;
  }
  
  if (errorProductos) {
    return <div>Error: {errorProductos}</div>;
  }

  // (Aquí iría la lógica para seleccionar un producto de la tabla para editar)
  const handleSelectProducto = (producto) => {
    console.log("Seleccionado:", producto);
    // (Aquí guardarías el producto seleccionado en un estado local)
  }

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