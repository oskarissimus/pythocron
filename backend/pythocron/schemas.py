from pydantic import BaseModel


class PythocronBase(BaseModel):
    script: str
    schedule: str


class PythocronCreate(PythocronBase):
    pass


class Pythocron(PythocronBase):
    id: int
