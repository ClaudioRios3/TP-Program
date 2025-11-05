from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class Usuario(BaseModel):
    id: int
    username: str
    rol: str

class UsuarioEnDB(Usuario):
    hashed_password: str