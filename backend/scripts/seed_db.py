#!/usr/bin/env python
"""
Database seeding script.
Reads mock_data.json and populates the PostgreSQL database.
"""

import asyncio
import json
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db.models import Base, SourceModel
from db.session import engine, AsyncSessionLocal


async def seed_database():
    """Seed the database with data from mock_data.json."""
    
    # Drop and recreate tables for clean schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    # Load mock data
    data_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "data",
        "mock_data.json"
    )
    
    with open(data_path, "r") as f:
        json_data = json.load(f)
    
    # Parse and transform the data
    sources = []
    items = json_data.get("collection", {}).get("items", [])
    
    for idx, item in enumerate(items, start=1):
        data = item.get("data", [{}])[0]
        links = item.get("links", [])
        
        # Find image URL
        image_url = None
        for link in links:
            if link.get("render") == "image":
                image_url = link.get("href")
                break
        
        sources.append(SourceModel(
            id=idx,
            name=data.get("title", f"NASA Item {idx}"),
            type=data.get("media_type", "unknown"),
            launch_date=data.get("date_created", ""),
            description=data.get("description", ""),
            image_url=image_url,
            status="Active",
        ))
    
    # Insert data
    async with AsyncSessionLocal() as session:
        session.add_all(sources)
        await session.commit()
        print(f"Successfully seeded {len(sources)} sources into the database.")


if __name__ == "__main__":
    asyncio.run(seed_database())
