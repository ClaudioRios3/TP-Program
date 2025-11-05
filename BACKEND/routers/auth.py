from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from config import cfgtoken
from schemas.auth import Token, Usuario
from services.auth import (
    authenticate_user,
    create_access_token,
    get_current_user,
    check_admin
)

router = APIRouter(prefix="/auth")


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    usuario = await authenticate_user(form_data.username, form_data.password)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=cfgtoken.ACCESS_TOKEN_LIFETIME)
    token = create_access_token(
        data={"sub": usuario.username}, expires_delta=access_token_expires
    )
    return Token(access_token=token, token_type="bearer")


@router.get("/me", response_model=Usuario)
async def read_users_me(
    current_user: Annotated[Usuario, Depends(get_current_user)],
):
    return current_user

@router.get("/admin")
async def admin_route(current_user: Usuario = Depends(check_admin)):
    return {"msg": f"Hola {current_user.username}, bienvenido!"}

@router.post("/register")
async def create_user(current_user: Usuario = Depends(check_admin)):
    return ""