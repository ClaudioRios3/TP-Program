from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from schemas.auth import Token, Usuario


router = APIRouter(prefix="/auth")

@router.post("/login", response_model=Token)
def login():
    return ""

@router.get("/me", response_model=Token)
def read_user():
    return ""