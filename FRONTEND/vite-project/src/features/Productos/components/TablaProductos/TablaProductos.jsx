import styles from './TablaProductos.module.css'

export function TablaProductos({ productos, onProductoSelect }) {
    return (
        <div className={styles.tableContainer}>
            <h3>Inventario</h3>
            <table className={styles.productTable}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Precio Compra</th>
                        <th>Precio Venta</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {productos.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.noData}>
                No hay productos en la base de datos.
                </td>
                </tr>
                ) : (
                    productos.map((pro) => (
                        <tr key={pro.id} onDoubleClick={() => onProductoSelect(pro)} className={styles.tableRow}>
                            <td>{pro.nombre}</td>
                            <td>{pro.descripcion}</td>
                            <td>{pro.stock}</td>
                            <td>{pro.precio_compra}</td>
                            <td>{pro.precio_venta}</td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    );
}



