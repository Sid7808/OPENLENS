"""
JWT creation and validation utilities using PyJWT.
Decoupled from FastAPI HTTP routes and dependencies.
"""
from datetime import datetime, timezone, timedelta
from typing import Any, Dict, Optional, Union
import jwt

from config import settings
from security.exceptions import ExpiredTokenError, InvalidTokenError


def create_access_token(
    user_id: Union[str, Dict[str, Any]],
    expires_delta: Optional[timedelta] = None,
    extra_claims: Optional[Dict[str, Any]] = None,
) -> str:
    """
    Creates a signed JWT access token.

    Args:
        user_id: The unique user identifier (userId) as string, or dict containing 'sub'.
        expires_delta: Optional custom expiration timedelta. Defaults to settings.jwt_access_token_expire_minutes.
        extra_claims: Optional dictionary with additional public claims.
                      Passwords and password hashes are strictly filtered out.

    Returns:
        Encoded JWT token as a string.
    """
    claims: Dict[str, Any] = {}

    if extra_claims:
        # Strictly exclude any sensitive password fields
        sensitive_fields = {"password", "password_hash", "passwordHash", "hashed_password"}
        claims.update({k: v for k, v in extra_claims.items() if k not in sensitive_fields})

    if isinstance(user_id, dict):
        sub_val = user_id.get("sub") or user_id.get("userId")
        claims.update({
            k: v for k, v in user_id.items()
            if k not in {"password", "password_hash", "passwordHash", "hashed_password"}
        })
    else:
        sub_val = str(user_id)

    if not sub_val:
        raise ValueError("Token subject ('sub') cannot be empty.")

    now = datetime.now(timezone.utc)
    if expires_delta is not None:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.jwt_access_token_expire_minutes)

    claims.update({
        "sub": str(sub_val),
        "iat": now,
        "exp": expire,
    })

    return jwt.encode(
        claims,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def decode_access_token(token: str) -> Dict[str, Any]:
    """
    Decodes and validates a signed JWT access token.

    Args:
        token: The encoded JWT string.

    Returns:
        The decoded claims payload (dict).

    Raises:
        ExpiredTokenError: If the token has expired.
        InvalidTokenError: If the token is invalid, tampered, or missing subject.
    """
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
        if "sub" not in payload or not payload["sub"]:
            raise InvalidTokenError("Token missing 'sub' subject claim.")
        return payload
    except jwt.ExpiredSignatureError as e:
        raise ExpiredTokenError("Token has expired.") from e
    except jwt.InvalidTokenError as e:
        raise InvalidTokenError(f"Invalid token: {str(e)}") from e
