import json
from typing import Any, List, Literal, Optional, Union

from pydantic import BaseModel, ConfigDict, Field


class EqualityFilter(BaseModel):
    field: str
    type: Literal["equality"]
    value: Any


class RangeFilter(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    field: str
    type: Literal["range"]
    from_value: Optional[Any] = Field(None, alias="from")
    to_value: Optional[Any] = Field(None, alias="to")


FilterItem = Union[EqualityFilter, RangeFilter]


def parse_filters(json_str: str) -> List[FilterItem]:
    try:
        items = json.loads(json_str)
        if not isinstance(items, list):
            return []
        result: List[FilterItem] = []
        for item in items:
            if not isinstance(item, dict):
                continue
            filter_type = item.get("type")
            if filter_type == "equality":
                result.append(EqualityFilter.model_validate(item))
            elif filter_type == "range":
                result.append(RangeFilter.model_validate(item))
        return result
    except Exception:
        return []
