from pydantic import BaseModel

class ProductoIn(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int
    id_categoria: int


