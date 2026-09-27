# OpenLens Core Service

The **Core Service** is the main API gateway, database coordinator, and authentication service for OpenLens. It manages user accounts, token issuance, and authentication.

---

## 📁 Architecture & Components

```
services/core/
├── config.py                  # Pydantic BaseSettings (environment variables)
├── storage.py                 # Storage abstraction (pending PostgreSQL rollout)
├── create_tables.py           # CLI database initialization stub
├── main.py                    # FastAPI application entry point
├── security/                  # Cryptographic utilities (Argon2id & PyJWT)
│   ├── password.py            # Argon2id hashing & verification
│   ├── jwt.py                 # Access token creation & decoding
│   └── exceptions.py          # Security domain exceptions
├── repository/                # Data Access Layer (DAL) interface
│   ├── user_repository.py     # UserRepository interface (pending PostgreSQL)
│   ├── exceptions.py          # Repository domain exceptions
│   └── README.md              # UserRepository documentation
├── verify_security.py         # Test suite for Security Foundation
└── verify_user_repository.py  # Test suite placeholder
```

---

## 🚀 Getting Started

### 1. Prerequisites & Virtual Environment
Ensure dependencies are installed:
```powershell
# Activate virtual environment (from services/core)
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

### 2. Run Security Tests
```powershell
# Verify Security Layer (Argon2id + JWT)
python verify_security.py
```

### 3. Start the Service
```powershell
python main.py
```
The FastAPI application starts on `http://localhost:8080`.
* Health check: `http://localhost:8080/health`
* Interactive docs: `http://localhost:8080/docs`

---

## 📖 Architecture & Transition Plan
* For the upcoming PostgreSQL architecture and implementation roadmap, see the [PostgreSQL Architecture Plan](file:///C:/Users/ansuj/.gemini/antigravity-ide/brain/5008a993-f7c6-4058-afc6-1f9fcf02ea61/postgresql_architecture_plan.md).
