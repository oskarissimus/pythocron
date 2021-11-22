import pathlib
from functools import lru_cache
from subprocess import run
from typing import Optional

from apscheduler.events import EVENT_JOB_EXECUTED, JobExecutionEvent
from apscheduler.job import Job
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pythocron import config, schemas, utils


@lru_cache()
def get_settings():
    return config.Settings()


scheduler = BackgroundScheduler()


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://www.pythoncron.com",
    "http://pythoncron.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


def log_executed_job_output(event: JobExecutionEvent):
    event_pythocron_logfile_path = f"{get_settings().logs_dir_path}/{event.job_id}.log"

    with open(event_pythocron_logfile_path, "a") as pythocron_logfile:
        pythocron_logfile.write(event.retval.stdout)

    print(event.retval.stdout)


@app.on_event("startup")
def startup_event():
    scheduler.start()
    scheduler.add_listener(log_executed_job_output, EVENT_JOB_EXECUTED)

    pathlib.Path(get_settings().logs_dir_path).mkdir(parents=True, exist_ok=True)
    pathlib.Path(get_settings().scripts_dir_path).mkdir(parents=True, exist_ok=True)
    pathlib.Path(get_settings().scripts_dir_path).parent.mkdir(
        parents=True, exist_ok=True
    )
    pathlib.Path(get_settings().crontab_path).touch()


@app.get("/")
def root():
    return {"message": "Hello pythocron!"}


@app.get("/pythocrons")
def list_pythocrons(
    settings: config.Settings = Depends(get_settings),
):
    abs_paths_list = pathlib.Path(settings.scripts_dir_path).glob("*.py")
    return sorted([abs_path.name[:-3] for abs_path in abs_paths_list])


@app.get("/pythocrons/{pythocron_id}")
def read_pythocron(
    pythocron_id: str,
    settings: config.Settings = Depends(get_settings),
):
    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"
    try:
        pythocron_scriptfile_contents = open(pythocron_scriptfile_path).read()
        job: Optional[Job] = scheduler.get_job(pythocron_id)
        # month, day, day_of_week, hour, minute = job.trigger
        if job is not None:
            cron_expr_dict = {f.name: str(f) for f in job.trigger.fields}
            cron_expr_str = "{minute} {hour} {day} {month} {day_of_week}".format(
                **cron_expr_dict
            )

            return schemas.Pythocron(
                id=pythocron_id,
                script=pythocron_scriptfile_contents,
                schedule=cron_expr_str,
            )
        else:
            raise HTTPException(status_code=404, detail="Pythocron not found")

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Pythocron not found")


@app.post("/pythocrons")
def create_pythocron(
    pythocron: schemas.PythocronCreate,
    settings: config.Settings = Depends(get_settings),
):

    pythocron_id = utils.generate_id()

    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"

    with open(pythocron_scriptfile_path, "w") as pythocron_scriptfile:
        pythocron_scriptfile.write(pythocron.script)

    scheduler.add_job(
        id=pythocron_id,
        func=run,
        trigger=CronTrigger.from_crontab(pythocron.schedule),
        args=[[settings.python_interpreter_path, pythocron_scriptfile_path]],
        kwargs={"capture_output": True, "text": True},
    )

    return {"pythocron_id": pythocron_id}


@app.delete("/pythocrons/{pythocron_id}")
def delete_pythocron(
    pythocron_id: str,
    settings: config.Settings = Depends(get_settings),
):

    pythocron_logfile_path = f"{settings.logs_dir_path}/{pythocron_id}.log"
    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"
    pathlib.Path(pythocron_logfile_path).unlink(missing_ok=True)
    pathlib.Path(pythocron_scriptfile_path).unlink(missing_ok=True)

    scheduler.remove_job(pythocron_id)

    return {"deleted": {"pythocron_id": pythocron_id}}


@app.put("/pythocrons/{pythocron_id}")
def update_pythocron(
    pythocron_id: str,
    pythocron: schemas.PythocronUpdate,
    settings: config.Settings = Depends(get_settings),
):

    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"

    with open(pythocron_scriptfile_path, "w") as pythocron_scriptfile:
        pythocron_scriptfile.write(pythocron.script)

    scheduler.get_job(pythocron_id).modify(
        trigger=CronTrigger.from_crontab(pythocron.schedule)
    )
    return {"updated": {"pythocron_id": pythocron_id}}


@app.get("/pythocrons/{pythocron_id}/logs")
def read_pythocron_logs(
    pythocron_id,
    settings: config.Settings = Depends(get_settings),
):
    pythocron_logfile_path = f"{settings.logs_dir_path}/{pythocron_id}.log"
    try:
        return open(pythocron_logfile_path).read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Pythocron logs not found")
