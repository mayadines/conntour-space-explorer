from typing import List

from db.base import DBSession
from filters import EqualityFilter, FilterItem, RangeFilter


class BaseRepository:
    def __init__(self, db_session: DBSession) -> None:
        self._db_session = db_session

    def _build_conditions(self, model, filter_items: List[FilterItem]) -> list:
        def equality_conditions(column, filter_item: EqualityFilter) -> list:
            return [column == filter_item.value]

        def range_conditions(column, filter_item: RangeFilter) -> list:
            conditions = []
            if filter_item.from_value is not None:
                conditions.append(column >= filter_item.from_value)
            if filter_item.to_value is not None:
                conditions.append(column <= filter_item.to_value)
            return conditions

        condition_builders = {
            "equality": equality_conditions,
            "range": range_conditions,
        }

        conditions = []
        for filter_item in filter_items:
            column = getattr(model, filter_item.field, None)
            if column is None:
                continue
            build = condition_builders.get(filter_item.type)
            if build is not None:
                conditions.extend(build(column, filter_item))
        return conditions
