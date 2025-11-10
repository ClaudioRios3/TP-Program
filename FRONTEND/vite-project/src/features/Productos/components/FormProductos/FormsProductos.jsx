import { useState } from 'react'; // Faltaba importar useState
import "./FormProductos.module.css";

// 1. Recibe la función 'onSubmit' y un 'producto' para editar (opcional)
export function FormsProductos({ onSubmit, onClear, productoParaEditar }) {
    
    // 2. Estado local del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [precio_compra, setPrecioCompra] = useState('');
    const [precio_venta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');
    // (Faltaría lógica para cargar el 'productoParaEditar' en el form)

    // 3. El handleSubmit AHORA LLAMA A LA PROP
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 4. Llama a la función que vino del hook (createProducto)
        await onSubmit({
            nombre,
            descripcion,
            precio: parseFloat(precio) || 0,
            stock: parseInt(stock) || 0,
            precio_compra: parseFloat(precio_compra) || 0,
            precio_venta: parseFloat(precio_venta) || 0,
        });
        
        // Limpiamos el form después de enviar
        handleClear();
    };

    const handleClear = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setPrecioCompra('');
        setPrecioVenta('');
        setStock('');
    };   

    return (
        <div className="form-container">
            <h3 className="form-title">Agregar producto</h3>
            <form className='form-products' onSubmit={handleSubmit}>
                
                {/*--- Campo Nombre del producto ---*/}
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

                {/*--- Campo Descripción del producto ---*/}
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

                {/*--- Campo Precio del producto ---*/}
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

                {/* Precio Compra */}
                <div className="form-group">
                    <label htmlFor="precioCompra" className="form-label">Precio Compra</label>
                    <input 
                        type="number" 
                        id="precioCompra" 
                        value={precio_compra} 
                        onChange={(e) => setPrecioCompra(e.target.value)}
                        className="form-input"
                    />
                </div>
                {/* Precio Venta */}
                <div className="form-group">
                    <label htmlFor="precioVenta" className="form-label">Precio Venta</label>
                    <input 
                        type="number" 
                        id="precioVenta" 
                        value={precio_venta} 
                        onChange={(e) => setPrecioVenta(e.target.value)}
                        className="form-input"
                    />
                </div>

                {/*--- Campo Stock del producto ---*/}
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

                {/*--- Campo Categoría del producto ---*/}
                {/* <div className="form-group">
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
                </div> */}

                <div className="form-buttons-group">
                    <button type="submit" className="form-button form-button-submit">Agregar</button>
                    {/* <button type="button" onClick={handleCancel} className="form-button form-button-cancel">Cancelar</button> */}
                    <button type="button" onClick={handleClear} className="form-button form-button-secondary">Limpiar</button>
                    {/* <button type="button" onClick={handleUpdate} className="form-button form-button-secondary">Actualizar</button> */}
                    {/* <button type="button" onClick={handleDelete} className="form-button form-button-danger">Eliminar</button> */}
                </div>
            </form>
        </div>
    )
}

// Exporta por defecto si es necesario, aunque tu importación usa 'export function'
// export default FormsProductos;