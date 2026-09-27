# OpenLens Core — User Repository

The **`UserRepository`** is the Data Access Layer (DAL) interface for managing user identity and credentials in OpenLens Core.

---

## 🏛️ Architecture Overview

The repository layer isolates persistence logic from the API layer (FastAPI routers and dependencies) and coordinates with the security module (`argon2id` and `PyJWT`).

> [!NOTE]
> DynamoDB implementation has been completely removed. Concrete persistence implementation is pending the PostgreSQL architecture rollout as defined in [postgresql_architecture_plan.md](file:///C:/Users/ansuj/.gemini/antigravity-ide/brain/5008a993-f7c6-4058-afc6-1f9fcf02ea61/postgresql_architecture_plan.md).

---

## 🛠️ Public Interface (`UserRepository`)

The user repository defines the following core interface:

1. `create_user(email: str, password: str, full_name: Optional[str] = None)`
2. `get_user_by_email(email: str, include_password_hash: bool = False)`
3. `get_user_by_id(user_id: str, include_password_hash: bool = False)`
4. `authenticate_user(email: str, password: str)`

---

## ⚠️ Exception Hierarchy (`repository.exceptions`)

The repository uses domain-specific exceptions, keeping it decoupled from database engines and HTTP frameworks:

```python
RepositoryError (Base)
├── UserAlreadyExistsError  # Raised when duplicate email is registered
└── UserNotFoundError       # Raised when expected user does not exist
```
