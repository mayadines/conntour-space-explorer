from typing import Optional

from pydantic import BaseModel, ConfigDict


class Source(BaseModel):
    """Domain model for NASA image sources."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    type: str
    launch_date: str
    description: str = ""
    image_url: Optional[str] = None
    status: str
