import jwt
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from pwdlib import PasswordHash
from config.database import db
from config import cfgtoken

from schemas.auth import TokenData, UsuarioEnDB, Usuario

# --- OBJETOS ---
password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


# --- FUNCIONES AUXILIARES ---
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


async def get_user(username: str) -> Optional[UsuarioEnDB]:
    query = "SELECT id, username, hashed_password FROM usuarios WHERE username = :username"
    row = await db.fetch_one(query, values={"username": username})
    if row:
        return UsuarioEnDB(**row)
    return None


async def authenticate_user(username: str, password: str):
    usuario = await get_user(username)
    if not usuario:
        return False
    if not verify_password(password, usuario.hashed_password):
        return False
    return usuario


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=cfgtoken.ACCESS_TOKEN_LIFETIME))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, cfgtoken.SECRET_KEY, algorithm=cfgtoken.ALGORITHM)


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, cfgtoken.SECRET_KEY, algorithms=[cfgtoken.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sesión expirada, por favor vuelve a iniciar sesión",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidTokenError:
        raise credentials_exception

    usuario_db = await get_user(token_data.username)
    if usuario_db is None:
        raise credentials_exception
    return Usuario(**usuario_db.model_dump())

def check_admin(user: Usuario = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="No tiene permisos suficientes")
    return user
