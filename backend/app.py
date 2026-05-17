import importlib
import pkgutil
from contextlib import asynccontextmanager

import controllers
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="Space Explorer API",
    description="API for browsing NASA images",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for module_info in pkgutil.iter_modules(controllers.__path__):
    module = importlib.import_module(f"controllers.{module_info.name}")
    if hasattr(module, "router"):
        app.include_router(module.router)
