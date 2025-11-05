from pydantic import BaseModel

class CategoriaEnDB(BaseModel):
    nombre: str

class Categoria(BaseModel):
    id: int
    nombre: str