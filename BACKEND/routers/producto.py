from typing import List
from fastapi import APIRouter
from schemas.producto import Producto, ProductoIn
import services.producto as service

router = APIRouter(prefix="/productos")

@router.get("/", response_model=List[Producto])
def read_productos():
    return ""

@router.get("/{id}", response_model=Producto)
def read_producto():
    return ""