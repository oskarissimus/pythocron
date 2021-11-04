from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from crontab import CronTab
import pathlib
from pythocron import config
from functools import lru_cache


@lru_cache()
def get_settings():
    return config.Settings()


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    pathlib.Path(config.Settings().logs_dir_path).mkdir(parents=True, exist_ok=True)


@app.get("/")
def root(settings: config.Settings = Depends(get_settings)):
    return {"message": "Hello pythocron"}


@app.post("/backend/pythocron")
def create_pythocron(settings: config.Settings = Depends(get_settings)):
    pythocron_id = 1488
    pythocron_logfile_path = f"{settings.logs_dir_path}/{pythocron_id}.log"

    cron = CronTab(user="root")
    job = cron.new(command=f"echo hello_world >> {pythocron_logfile_path}")
    job.minute.every(1)
    cron.write()


@app.get("/backend/pythocron/1488/logs")
def read_pythocron_logs():
    pythocron_id = 1488
    logs_dir_path = "/app/data/logs"
    pythocron_logfile_path = f"{logs_dir_path}/{pythocron_id}.log"
    try:
        return open(pythocron_logfile_path).readlines()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Item not found")
