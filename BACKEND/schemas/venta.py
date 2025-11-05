from pydantic import BaseModel
# import datetime

class DetalleVentaEnDB(BaseModel):
    id_producto: int
    cantidad: int

class DetalleVenta(BaseModel):
    id: int
    id_venta: int
    id_producto: int
    cantidad: int
    subtotal: float

class Venta(BaseModel):
    id: int
    # fecha: datetime
    total: float
    id_usuario: int

    detalles: list[DetalleVenta] = []
