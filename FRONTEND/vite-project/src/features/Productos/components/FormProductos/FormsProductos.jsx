import "./FormProductos.css";

export function FormsProductos({ productos, categorias }) {

    const [nombre, setNombre] = useState([]);
    const [precio, setPrecio] = useState([]);
    const [descripcion, setDescripcion] = useState([]);
    const [stock, setStock] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newProduct = {
            nombre,
            precio,
            descripcion,
            stock
    };
        console.log('Producto a agregar:', newProduct);
        // Aquí iría la lógica para enviar el nuevo producto a la API o base de datos
    }
    const handleCancel = async (e) => {
        e.preventDefault();
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setStock('');
    }   

    return (
        <div className="form-container">
            <h3 className="form-title">Agregar producto</h3>
            <form className='form-products' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreProducto" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        id="nombreProducto" 
                        placeholder="Ej: Manzana"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcionProducto" className="form-label">Descripción</label>
                    <input 
                        type="text"
                        id="descripcionProducto"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precioProducto" className="form-label">Precio</label>
                    <input 
                        type="number" 
                        id="precioProducto" 
                        placeholder="Precio en pesos ($AR)"
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)}
                        min="0"
                        step="0.01"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stockProducto" className="form-label">Stock</label>
                    <input 
                        type="number"
                        id="stockProducto" 
                        placeholder="1, 2, 3, ..."
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        min="0"
                        step="1"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoriaProductos" className="form-label">Categoría</label>
                    {productos.map((item) => (
                        <select 
                            name="categoria" 
                            id="categoriaProductos" 
                            className="form-select"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="" disabled>Selecciona una categoría...</option>
                            
                            {
                                categorias.map((cat) => (
                                    <option key={cat.id} value={cat.nombre}>
                                        {cat.nombre}
                                    </option>
                                ))
                            }
                        </select>
                    ))}
                </div>

                <div className="form-buttons-group">
                    <button type="submit" className="form-button form-button-submit">Agregar</button>
                    {/* <button type="button" onClick={handleCancel} className="form-button form-button-cancel">Cancelar</button> */}
                    <button type="button" onClick={handleClear} className="form-button form-button-secondary">Limpiar</button>
                    <button type="button" onClick={handleUpdate} className="form-button form-button-secondary">Actualizar</button>
                    <button type="button" onClick={handleDelete} className="form-button form-button-danger">Eliminar</button>
                </div>
            </form>
        </div>
    )
}