from pydantic import BaseModel
from typing import Optional, Dict

class User(BaseModel):
    id: str
    email: str
    name: str
    hashed_password: str

# Temporary user database mapping email to User model.
# Satisfies requirement to isolate storage so it can later be replaced with DynamoDB.
# Default User: admin@openlens.com / Password123

USERS_DB: Dict[str, User] = {
    "admin@openlens.com": User(
        id="usr_01j5k6m7n8p9q0r1s2t3u4v5w6",
        email="admin@openlens.com",
        name="Admin User",
        hashed_password="fafd5abee9a2f7d5f6cc4f82ee6a006d:9301aacf591ad5a7debe3a554151c4fffcfc7e293d0b9505c039fe0d56b09c0a"
    )
}

def get_user_by_email(email:str) -> Optional[User]:
    """
    Retrieve user by email.
    This function isolates user retrieval and can be easily replaced with DynamoDB query.
    """

    return USERS_DB.get(email.lower())

def get_user_by_id(user_id:str) -> Optional[User]:
    """
    Retrieve user by ID.
    This function isolates user retrieval and can be easily replaced with DynamoDB scan/query.
    """

    for user in USERS_DB.values():
        if user.id == user_id:
            return user
    
    return None

    