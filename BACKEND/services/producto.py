from typing import List
from fastapi import HTTPException
from config.database import db
from schemas.producto import Producto, ProductoEnDB


async def get_all_productos() -> List[Producto]:
    query = "SELECT * FROM productos"
    rows = await db.fetch_all(query=query)
    return rows


async def get_producto_by_id(id: int) -> Producto:
    query = "SELECT * FROM productos WHERE id = :id"
    row = await db.fetch_one(query=query, values={"id": id})
    if not row:
        raise HTTPException(status_code=404, detail="producto no encontrado")
    return row


async def create_producto(producto: ProductoEnDB) -> Producto:
    query = """
        INSERT INTO productos (nombre, descripcion, stock, precio_compra, precio_venta)
        VALUES (:nombre, :descripcion, :stock, :precio_compra, :precio_venta)
    """
    last_record_id = await db.execute(query=query, values=producto.dict())
    return {**producto.dict(), "id": last_record_id}


async def update_producto(producto_id: int, producto: ProductoEnDB) -> Producto:
    query = """
        UPDATE productos
        SET nombre = :nombre,
            descripcion = :descripcion,
            stock = :stock,
            precio_compra = :precio_compra,
            precio_venta=:precio_venta
        WHERE id = :id
    """
    values = {**producto.dict(), "id": producto_id}
    await db.execute(query=query, values=values)
    return {**producto.dict(), "id": producto_id}


async def delete_producto(id: int) -> dict:
    query = "DELETE FROM productos WHERE id = :id"
    result = await db.execute(query=query, values={"id": id})
    if not result:
        raise HTTPException(status_code=404, detail="producto no encontrado")
    return {"message": "producto eliminado correctamente"}
