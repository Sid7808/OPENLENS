# OpenLens Core Service

The **Core Service** is the main API gateway, database coordinator, and authentication service for OpenLens. It manages user accounts, token issuance, and serves as the single source of truth for DynamoDB interactions.

---

## 📁 Architecture & Components

```
services/core/
├── config.py                  # Pydantic BaseSettings (environment variables)
├── storage.py                 # DynamoDB connection & table initialization
├── create_tables.py           # CLI table initialization wrapper
├── main.py                    # FastAPI application entry point
├── security/                  # Cryptographic utilities (Argon2id & PyJWT)
│   ├── password.py            # Argon2id hashing & verification
│   ├── jwt.py                 # Access token creation & decoding
│   └── exceptions.py          # Security domain exceptions
├── repository/                # Data Access Layer (DAL)
│   ├── user_repository.py     # UserRepository implementation
│   ├── exceptions.py          # Repository domain exceptions
│   └── README.md              # Detailed UserRepository documentation
├── verify_security.py         # Test suite for Security Foundation (Step 1)
└── verify_user_repository.py  # Test suite for UserRepository (Step 2)
```

---

## 🚀 Getting Started

### 1. Prerequisites & Virtual Environment
Ensure dependencies are installed and DynamoDB Local is running:
```powershell
# Start DynamoDB Local via Docker Compose (from repo root)
docker compose up -d

# Activate virtual environment (from services/core)
.venv\Scripts\Activate.ps1
```

### 2. Initialize DynamoDB Tables
Run the idempotent table initialization script:
```powershell
python create_tables.py
```
This creates the `OpenLensUsers` table with:
* Partition Key: `userId` (String)
* Global Secondary Index: `email-index` on `email` (String) with `ALL` projection.

### 3. Run Automated Tests
```powershell
# Verify Security Layer (Argon2id + JWT)
python verify_security.py

# Verify User Repository (CRUD + GSI + DynamoDB persistence)
python verify_user_repository.py
```

### 4. Start the Service
```powershell
python main.py
```
The FastAPI application starts on `http://localhost:8080`.
* Health check: `http://localhost:8080/health`
* Interactive docs: `http://localhost:8080/docs`

---

## 📖 Component Documentation
* For details on `UserRepository` API methods, schemas, and query patterns, see [repository/README.md](repository/README.md).
