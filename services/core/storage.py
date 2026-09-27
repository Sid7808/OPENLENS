"""
Storage abstraction layer for OpenLens Core service.
Database implementation is pending PostgreSQL architectural transition.
"""
from typing import Optional


def init_db() -> None:
    """
    Initializes persistent storage.
    Implementation pending PostgreSQL architecture rollout.
    """
    pass


def close_db() -> None:
    """
    Closes database connections on application shutdown.
    Implementation pending PostgreSQL architecture rollout.
    """
    pass
