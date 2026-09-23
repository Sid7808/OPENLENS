"""
Repository exception hierarchy for OpenLens Core.
Decoupled from FastAPI HTTP exceptions.
"""

class RepositoryError(Exception):
    """Base exception for all repository-level errors."""
    pass


class UserAlreadyExistsError(RepositoryError):
    """Raised when attempting to create a user with an email that is already registered."""
    pass


class UserNotFoundError(RepositoryError):
    """Raised when an expected user record cannot be found."""
    pass
