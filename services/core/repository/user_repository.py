"""
User repository interface for OpenLens Core service.
Implementation pending PostgreSQL architectural transition.
"""
from typing import Any, Dict, Optional
from repository.exceptions import RepositoryError, UserAlreadyExistsError, UserNotFoundError


class UserRepository:
    """
    Data Access Layer (DAL) interface for managing users in OpenLens Core.
    Concrete persistence implementation is pending PostgreSQL rollout.
    """

    def __init__(self, *args, **kwargs):
        pass

    async def create_user(
        self,
        email: str,
        password: str,
        full_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Creates and persists a new user (pending PostgreSQL implementation)."""
        raise NotImplementedError("UserRepository.create_user is pending PostgreSQL implementation.")

    async def get_user_by_email(
        self,
        email: str,
        include_password_hash: bool = False,
    ) -> Optional[Dict[str, Any]]:
        """Retrieves a user by email (pending PostgreSQL implementation)."""
        raise NotImplementedError("UserRepository.get_user_by_email is pending PostgreSQL implementation.")

    async def get_user_by_id(
        self,
        user_id: str,
        include_password_hash: bool = False,
    ) -> Optional[Dict[str, Any]]:
        """Retrieves a user by ID (pending PostgreSQL implementation)."""
        raise NotImplementedError("UserRepository.get_user_by_id is pending PostgreSQL implementation.")

    async def authenticate_user(
        self,
        email: str,
        password: str,
    ) -> Optional[Dict[str, Any]]:
        """Authenticates a user (pending PostgreSQL implementation)."""
        raise NotImplementedError("UserRepository.authenticate_user is pending PostgreSQL implementation.")
