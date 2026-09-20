"""
Security and authentication exception hierarchy for openlens core.
decoupled from FastAPI HTTP exceptions.
"""

class SecurityError(Exception):
    """Base exception for security-related operations."""
    pass

class TokenError(SecurityError):
    """Base exceptions for JWT processing errors. """
    pass

class ExpiredTokenError(TokenError):
    """Raised when a JWT token is expired."""
    pass

class InvalidTokenError(TokenError):
    """Raised when a JWT acess token is invalid, malformed or tampered."""
    pass