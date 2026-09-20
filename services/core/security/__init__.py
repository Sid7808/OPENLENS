"""
Security module for OpenLens Core.
Exposes password hashing and JWT utilities.
"""
from security.password import hash_password, verify_password
from security.jwt import create_access_token, decode_access_token
from security.exceptions import (
    SecurityError,
    TokenError,
    ExpiredTokenError,
    InvalidTokenError,
)

__all__ = [
    "hash_password",
    "verify_password",
    "create_access_token",
    "decode_access_token",
    "SecurityError",
    "TokenError",
    "ExpiredTokenError",
    "InvalidTokenError",
]
