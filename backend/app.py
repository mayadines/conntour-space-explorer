import importlib
import pkgutil
from contextlib import asynccontextmanager

import modules
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
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

for module_info in pkgutil.iter_modules(modules.__path__):
    module = importlib.import_module(f"modules.{module_info.name}.router")
    if hasattr(module, "router"):
        app.include_router(module.router)
