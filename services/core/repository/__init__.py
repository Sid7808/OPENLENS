"""
Repository layer for OpenLens Core service.
Exposes UserRepository and associated domain exceptions.
"""
from repository.exceptions import (
    RepositoryError,
    UserAlreadyExistsError,
    UserNotFoundError,
)
from repository.user_repository import UserRepository

__all__ = [
    "UserRepository",
    "RepositoryError",
    "UserAlreadyExistsError",
    "UserNotFoundError",
]
