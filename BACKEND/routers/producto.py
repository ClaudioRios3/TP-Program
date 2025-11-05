from typing import List
from fastapi import APIRouter, Depends
from schemas.producto import Producto, ProductoEnDB
from services.auth import get_current_user, check_admin
import services.producto as service

router = APIRouter(prefix="/productos")

@router.get("/", response_model=List[Producto])
async def read_productos():
    return await service.get_all_productos()


@router.get("/{id}", response_model=Producto)
async def read_producto(id: int):
    return await service.get_producto_by_id(id)


@router.post("/", response_model=Producto, dependencies=[Depends(check_admin)])
async def create_producto(producto: ProductoEnDB):
    return await service.create_producto(producto)


@router.put("/{id}", response_model=Producto, dependencies=[Depends(check_admin)])
async def update_producto(id: int, producto: ProductoEnDB):
    return await service.update_producto(id, producto)


@router.delete("/{id}", dependencies=[Depends(check_admin)])
async def delete_producto(id: int):
    return await service.delete_producto(id)
