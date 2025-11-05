from pydantic import BaseModel

class Token(BaseModel):
    acces_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class Usuario(BaseModel):
    username: str

class UsuarioInDB(BaseModel):
    hashed_password: str