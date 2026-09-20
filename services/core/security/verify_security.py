"""
Verification script for OpenLens Phase 5 Step 1: Security Foundation.
Tests Argon2id password hashing, JWT token lifecycle, tampering, and expiration.
"""
from datetime import timedelta
from config import settings
from security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    ExpiredTokenError,
    InvalidTokenError,
)

def run_tests():
    print("=== OpenLens Security Foundation Verification ===")
    
    # 1. Configuration checks
    assert settings.jwt_secret_key, "JWT secret key must not be empty"
    assert settings.jwt_algorithm == "HS256", f"Expected HS256, got {settings.jwt_algorithm}"
    assert settings.jwt_access_token_expire_minutes == 30, f"Expected 30 min, got {settings.jwt_access_token_expire_minutes}"
    print("[PASS] Configuration loaded correctly.")

    # 2. Password Hashing checks
    raw_password = "OpenLensSecurePassword123!"
    hash1 = hash_password(raw_password)
    hash2 = hash_password(raw_password)
    
    assert hash1.startswith("$argon2id$"), "Hash must be an Argon2id format"
    assert hash1 != raw_password, "Plaintext must not equal hash"
    assert hash1 != hash2, "Salt uniqueness: two hashes of the same password must differ"
    assert verify_password(raw_password, hash1) is True, "Correct password must verify"
    assert verify_password("WrongPassword!", hash1) is False, "Incorrect password must fail"
    assert verify_password("", hash1) is False, "Empty password must fail"
    assert verify_password(raw_password, "invalid$hash") is False, "Malformed hash must fail"
    print("[PASS] Argon2id password hashing & verification verified.")

    # 3. JWT Creation & Validation checks
    user_id = "usr_01HXYZ123456789"
    token = create_access_token(user_id)
    assert isinstance(token, str) and len(token) > 20, "create_access_token must return valid JWT string"
    
    decoded = decode_access_token(token)
    assert decoded["sub"] == user_id, f"Payload sub must be {user_id}"
    assert "exp" in decoded, "Payload must have exp"
    assert "iat" in decoded, "Payload must have iat"
    assert "password" not in decoded and "passwordHash" not in decoded, "Sensitive fields must never leak"
    print("[PASS] JWT creation & payload validation verified.")

    # 4. Tampered Token check
    tampered_token = token[:-5] + ("AAAAA" if not token.endswith("AAAAA") else "BBBBB")
    try:
        decode_access_token(tampered_token)
        assert False, "Tampered token must not validate"
    except InvalidTokenError:
        print("[PASS] Tampered JWT rejected successfully.")

    # 5. Expired Token check
    expired_token = create_access_token(user_id, expires_delta=timedelta(seconds=-10))
    try:
        decode_access_token(expired_token)
        assert False, "Expired token must not validate"
    except ExpiredTokenError:
        print("[PASS] Expired JWT rejected with ExpiredTokenError successfully.")

    print("\n[ALL CHECKS PASSED] Security Foundation is ready for Step 2.")

if __name__ == "__main__":
    run_tests()
