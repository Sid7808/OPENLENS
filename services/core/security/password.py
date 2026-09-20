"""
Password hashing and verification utilities using Argon2id.
Decoupled from HTTP routes and persistence layers.
"""


from argon2 import PasswordHasher
from argon2.exceptions import VerificationError , InvalidHashError

# PasswordHasher defaults to Type.ID (Argon2id) with RFC 9106 recommended parameters

_hasher = PasswordHasher()

def hash_password(password: str) -> str:
    """
    Hashes a plain text pasword using Argon2id.

    Args:
        password: The plaintext password to hash

    Returns:
        The Argon2id encoded password hash to string.

    Raises:
    VlaueError: If password is empty or not a string.    
    """

    if not isinstance(password, str) or not password:
        raise ValueError("Password must be a non-empty string.")
    return _hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    """
    Verify a plain text password against a Argon2id hash.

    Args:
    password: The plain text password to verify.
    password_hash: The stored Argon2id hash string.

    Returns:
    True if the password matches the hash , False otherwise.
    """

    if not password or not password_hash:
        return False
    try: 
        return _hasher.verify(password_hash ,password)
    except (VerificationError, InvalidHashError):
        return False