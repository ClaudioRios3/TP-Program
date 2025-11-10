import { useProductos } from '../../hooks/useProductos'; // 1. Importas tu hook
import FormsProductos from './components/FormProductos/FormsProductos'; 
import TablaProductos from './components/TablaProductos/TablaProductos';


const ProductosTab = () => {
  
  // 2. ¡Consumes el hook!
  const { 
    productos,
    producto,
    createProducto,
    getProductoById,
    getAllProductos,
    isLoadingProductos
  } = useProductos();

  // 3. Manejas los estados de UI
  if (isLoadingProductos) {
    return <div>Cargando productos...</div>;
  }

  // 4. Función para el formulario (ejemplo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = e.target.elements.nombre.value;
    const exito = await createProducto({ nombre: nombre, precio: 100 });
    
    if (exito) {
      alert('Producto creado!');
      e.target.reset();
    } else {
      alert('Error al crear el producto');
    }
  };

  const handleAddProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now() }; // Simula un ID único
        setProducts([...products, productWithId]);
        // Aquí también harías la llamada a tu API o BD para guardarlo
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna para el formulario */}
            <div className="lg:col-span-1">
                <FormsProductos onAddProduct={handleAddProduct} />
            </div>
            {/* Columna para la tabla */}
            <div className="lg:col-span-2">
                <ProductTable products={products} />
            </div>
        </div>
    );
};

export default ProductosTab;