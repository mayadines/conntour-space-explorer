from abc import ABC, abstractmethod
from typing import Generic, List, TypeVar

T = TypeVar("T")


class Repository(ABC, Generic[T]):
    """
    Abstract generic repository interface.

    Defines the contract for data access operations without
    coupling to any specific data source or entity type.
    """

    @abstractmethod
    async def get_all(self) -> List[T]:
        """Retrieve all entities."""
        pass
