from db.base import DBSession


class BaseRepository:
    def __init__(self, db_session: DBSession) -> None:
        self._db_session = db_session
