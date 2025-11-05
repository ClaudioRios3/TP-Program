from pydantic import BaseModel

class ProductoEnDB(BaseModel):
    nombre: str
    precio: float
    stock: int
    id_categoria: int

class Producto(BaseModel):
    id: int
    nombre:str
    precio: float
    stock: int
    id_categoria: int