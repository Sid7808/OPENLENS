# OpenLens Core Service

The **Core Service** is the main API gateway, database coordinator, and authentication service for OpenLens. It manages user accounts, token issuance, authentication, and PostgreSQL database connections.

---

## 📁 Architecture & Components

```
services/core/
├── config.py                  # Pydantic BaseSettings (PostgreSQL, JWT, server)
├── storage.py                 # PostgreSQL connection pool & health checks (SQLAlchemy async)
├── create_tables.py           # CLI database initialization utility
├── main.py                    # FastAPI application with /health and /health/db
├── security/                  # Cryptographic utilities (Argon2id & PyJWT)
│   ├── password.py            # Argon2id hashing & verification
│   ├── jwt.py                 # Access token creation & decoding
│   └── exceptions.py          # Security domain exceptions
├── repository/                # Data Access Layer (DAL)
│   ├── user_repository.py     # UserRepository implementation
│   ├── exceptions.py          # Repository domain exceptions
│   └── README.md              # Detailed UserRepository documentation
├── verify_security.py         # Test suite for Security Foundation
├── verify_db_connection.py    # Test suite for PostgreSQL connection & FastAPI health checks
└── verify_user_repository.py  # Test suite for UserRepository
```

---

## 🚀 Getting Started

### 1. Prerequisites & Virtual Environment

Ensure dependencies are installed and PostgreSQL is running:
```powershell
# Activate virtual environment (from services/core)
.venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt
```

### 2. Verify PostgreSQL Database Connection & Health Checks
```powershell
python verify_db_connection.py
```
Expected output:
* `[PASS] Database configuration verified.`
* `[PASS] Direct database connection check verified.`
* `[PASS] /health endpoint verified (status: healthy, db: connected).`
* `[PASS] /health/db endpoint verified.`

### 3. Run Security Tests
```powershell
python verify_security.py
```

### 4. Start the Service
```powershell
python main.py
```
The FastAPI application starts on `http://localhost:8080`.
* General Health & DB Check: `http://localhost:8080/health`
* Dedicated Database Health: `http://localhost:8080/health/db`
* Interactive API docs: `http://localhost:8080/docs`

---

## 📖 Architecture & Transition Plan
* For the complete schema design and roadmap, see the [PostgreSQL Architecture Plan](file:///C:/Users/ansuj/.gemini/antigravity-ide/brain/5008a993-f7c6-4058-afc6-1f9fcf02ea61/postgresql_architecture_plan.md).
