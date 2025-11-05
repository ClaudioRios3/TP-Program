from fastapi import FastAPI
from config.database import db
from routers import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origin = [
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origin,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.on_event('startup')
async def startup():
    await db.connect()

@app.on_event('shutdown')
async def shutdown():
    await db.disconnect()

@app.get("/")
def root():
    return {"message": "Hola, bienvenido a mi API REST"}

# Routers de la API
# app.include_router(auth.router)

