"""
User repository for OpenLens Core service.
Handles persistence, retrieval, and authentication checks against DynamoDB.
"""
from datetime import datetime, timezone
from typing import Any, Dict, Optional
import uuid
from boto3.dynamodb.conditions import Key

from config import settings
from storage import dynamodb as default_dynamodb
from security import hash_password, verify_password
from repository.exceptions import UserAlreadyExistsError


class UserRepository:
    """Data Access Layer for managing users in the DynamoDB OpenLensUsers table."""

    def __init__(self, dynamodb_resource=None, table_name: Optional[str] = None):
        self.dynamodb = dynamodb_resource or default_dynamodb
        self.table_name = table_name or settings.dynamodb_users_table
        self.table = self.dynamodb.Table(self.table_name)

    @staticmethod
    def _sanitize_user(user: Dict[str, Any]) -> Dict[str, Any]:
        """Returns a copy of the user item with sensitive fields removed."""
        sensitive_fields = {"passwordHash", "password", "password_hash"}
        return {k: v for k, v in user.items() if k not in sensitive_fields}

    def create_user(
        self,
        email: str,
        password: str,
        full_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Creates and persists a new user in DynamoDB.

        Args:
            email: User's email address.
            password: Raw plaintext password to be hashed.
            full_name: Optional user's full name.

        Returns:
            Sanitized user dictionary (without passwordHash).

        Raises:
            ValueError: If email or password is empty.
            UserAlreadyExistsError: If a user with the same email already exists.
        """
        if not email or not isinstance(email, str) or not email.strip():
            raise ValueError("Email must be a non-empty string.")
        if not password or not isinstance(password, str):
            raise ValueError("Password must be a non-empty string.")

        normalized_email = email.strip().lower()

        # Check uniqueness via email-index GSI
        existing_user = self.get_user_by_email(normalized_email)
        if existing_user:
            raise UserAlreadyExistsError(f"User with email '{normalized_email}' already exists.")

        # Hash password via Argon2id
        password_hash = hash_password(password)

        user_id = f"usr_{uuid.uuid4().hex}"
        now = datetime.now(timezone.utc).isoformat()

        item: Dict[str, Any] = {
            "userId": user_id,
            "email": normalized_email,
            "passwordHash": password_hash,
            "fullName": full_name.strip() if full_name else "",
            "isActive": True,
            "createdAt": now,
            "updatedAt": now,
        }

        self.table.put_item(Item=item)
        return self._sanitize_user(item)

    def get_user_by_email(
        self,
        email: str,
        include_password_hash: bool = False,
    ) -> Optional[Dict[str, Any]]:
        """
        Retrieves a user by email using the 'email-index' Global Secondary Index.

        Args:
            email: Email address to search.
            include_password_hash: Whether to retain passwordHash in the returned dict.

        Returns:
            User dictionary if found, else None.
        """
        if not email or not isinstance(email, str):
            return None

        normalized_email = email.strip().lower()

        response = self.table.query(
            IndexName="email-index",
            KeyConditionExpression=Key("email").eq(normalized_email),
            Limit=1,
        )

        items = response.get("Items", [])
        if not items:
            return None

        user = items[0]
        if not include_password_hash:
            return self._sanitize_user(user)
        return dict(user)

    def get_user_by_id(
        self,
        user_id: str,
        include_password_hash: bool = False,
    ) -> Optional[Dict[str, Any]]:
        """
        Retrieves a user by primary key (userId) via fast GetItem.

        Args:
            user_id: The unique userId string.
            include_password_hash: Whether to retain passwordHash in the returned dict.

        Returns:
            User dictionary if found, else None.
        """
        if not user_id or not isinstance(user_id, str):
            return None

        response = self.table.get_item(Key={"userId": user_id})
        user = response.get("Item")
        if not user:
            return None

        if not include_password_hash:
            return self._sanitize_user(user)
        return dict(user)

    def authenticate_user(
        self,
        email: str,
        password: str,
    ) -> Optional[Dict[str, Any]]:
        """
        Authenticates a user by email and plaintext password.

        Args:
            email: User's email.
            password: Raw plaintext password to verify.

        Returns:
            Sanitized user dictionary on successful verification, None on failure.
        """
        if not email or not password:
            return None

        user = self.get_user_by_email(email, include_password_hash=True)
        if not user:
            return None

        if not user.get("isActive", True):
            return None

        stored_hash = user.get("passwordHash", "")
        if not verify_password(password, stored_hash):
            return None

        return self._sanitize_user(user)
