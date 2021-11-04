from pydantic import BaseModel


class PythocronBase(BaseModel):
    script: str = (
        'from datetime import datetime\nprint(datetime.now())\nprint("cumbucket")'
    )
    schedule: str = "BISKUPA"


class PythocronCreate(PythocronBase):
    pass


class Pythocron(PythocronBase):
    id: int
