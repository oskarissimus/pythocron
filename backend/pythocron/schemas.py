from pydantic import BaseModel


class PythocronBase(BaseModel):
    script: str = (
        'from datetime import datetime\nprint(datetime.now())\nprint("cumbucket")'
    )
    schedule: str = "* * * * *"


class PythocronCreate(PythocronBase):
    pass


class PythocronUpdate(PythocronBase):
    pass


class Pythocron(PythocronBase):
    id: str
