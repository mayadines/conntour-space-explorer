from typing import List

from db.base import DBSession
from filters import EqualityFilter, FilterItem, RangeFilter


class BaseRepository:
    def __init__(self, db_session: DBSession) -> None:
        self._db_session = db_session

    def _build_conditions(self, model, filter_items: List[FilterItem]) -> list:
        conditions = []
        for item in filter_items:
            col = getattr(model, item.field, None)
            if col is None:
                continue
            if isinstance(item, EqualityFilter):
                conditions.append(col == item.value)
            elif isinstance(item, RangeFilter):
                if item.from_value is not None:
                    conditions.append(col >= item.from_value)
                if item.to_value is not None:
                    conditions.append(col <= item.to_value)
        return conditions
