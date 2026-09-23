"""
Focused verification script for OpenLens Phase 5 Step 2: UserRepository.
Tests persistence, GSI queries, primary key lookups, password hashing, and authentication against DynamoDB Local.
"""
import uuid
from repository import UserRepository, UserAlreadyExistsError


def run_tests():
    print("=== OpenLens UserRepository Verification ===")
    repo = UserRepository()

    test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    test_password = "SecurePassword123!"
    test_name = "Test Engineer"

    # 1. Test create_user
    user = repo.create_user(
        email=test_email,
        password=test_password,
        full_name=test_name,
    )
    assert user is not None, "Created user must not be None"
    assert "userId" in user and user["userId"].startswith("usr_"), "User must have a valid 'usr_' prefixed userId"
    assert user["email"] == test_email.lower(), "Email must be normalized to lowercase"
    assert user["fullName"] == test_name, f"Expected fullName '{test_name}', got '{user.get('fullName')}'"
    assert "passwordHash" not in user, "create_user output must NEVER leak passwordHash"
    assert user.get("isActive") is True, "User must default to isActive=True"
    print("[PASS] User creation succeeded with sanitized response.")

    user_id = user["userId"]

    # 2. Verify raw DynamoDB persistence & Argon2id hash
    raw_item = repo.table.get_item(Key={"userId": user_id}).get("Item")
    assert raw_item is not None, "Raw item must exist in DynamoDB"
    assert raw_item["passwordHash"].startswith("$argon2id$"), "Stored password must be an Argon2id hash"
    assert raw_item["passwordHash"] != test_password, "Plaintext password must NEVER be persisted"
    print("[PASS] DynamoDB persistence verified with Argon2id hash.")

    # 3. Test duplicate email rejection
    try:
        repo.create_user(
            email=test_email.upper(),  # Test case-insensitivity collision
            password="AnotherPassword456!",
        )
        assert False, "Expected UserAlreadyExistsError on duplicate email registration"
    except UserAlreadyExistsError:
        print("[PASS] Duplicate registration rejected with UserAlreadyExistsError.")

    # 4. Test get_user_by_email (GSI email-index lookup)
    found_by_email = repo.get_user_by_email(test_email)
    assert found_by_email is not None, "User must be found via get_user_by_email"
    assert found_by_email["userId"] == user_id, "Found user ID must match"
    assert "passwordHash" not in found_by_email, "get_user_by_email must NOT leak passwordHash by default"
    print("[PASS] GSI lookup via get_user_by_email succeeded.")

    # 5. Test get_user_by_id (Primary key GetItem lookup)
    found_by_id = repo.get_user_by_id(user_id)
    assert found_by_id is not None, "User must be found via get_user_by_id"
    assert found_by_id["email"] == test_email.lower(), "Found email must match"
    assert "passwordHash" not in found_by_id, "get_user_by_id must NOT leak passwordHash by default"
    print("[PASS] Primary Key lookup via get_user_by_id succeeded.")

    # 6. Test authenticate_user
    auth_success = repo.authenticate_user(test_email, test_password)
    assert auth_success is not None, "Authentication with correct password must succeed"
    assert auth_success["userId"] == user_id, "Authenticated user ID must match"
    assert "passwordHash" not in auth_success, "authenticate_user must return sanitized user"

    auth_wrong_pw = repo.authenticate_user(test_email, "WrongPassword!")
    assert auth_wrong_pw is None, "Authentication with wrong password must return None"

    auth_wrong_email = repo.authenticate_user("nonexistent@example.com", test_password)
    assert auth_wrong_email is None, "Authentication with nonexistent email must return None"
    print("[PASS] authenticate_user verification succeeded.")

    # 7. Clean up test record from DynamoDB
    repo.table.delete_item(Key={"userId": user_id})
    assert repo.get_user_by_id(user_id) is None, "Test user should be deleted"
    print("[PASS] Test cleanup succeeded.")

    print("\n[ALL CHECKS PASSED] UserRepository is completely functional and verified!")


if __name__ == "__main__":
    run_tests()
