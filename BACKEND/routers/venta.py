from fastapi import APIRouter
from schemas.venta import Venta, DetalleVenta, DetalleVentaEnDB

router = APIRouter(prefix="/ventas")

@router.get("/")
async def index():
    return ""

@router.get("/{id}", response_model=Venta)
async def obtener_venta(id):
    return ""

@router.post("/")
async def crear_venta():
    return ""
