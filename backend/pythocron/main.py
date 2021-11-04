from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from crontab import CronTab
import pathlib
from pythocron import config, schemas, utils
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
    pathlib.Path(get_settings().logs_dir_path).mkdir(parents=True, exist_ok=True)
    pathlib.Path(get_settings().scripts_dir_path).mkdir(parents=True, exist_ok=True)


@app.get("/")
def root():
    return {"message": "Hello pythocron"}


@app.get("/pythocrons")
def list_pythocrons(
    settings: config.Settings = Depends(get_settings),
):
    abs_paths_list = pathlib.Path(settings.scripts_dir_path).glob("*.py")
    return sorted([abs_path.name[:-3] for abs_path in abs_paths_list])


@app.get("/pythocrons/{pythocron_id}")
def read_pythocron(
    pythocron_id,
    settings: config.Settings = Depends(get_settings),
):
    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"
    try:
        pythocron_scriptfile_contents = open(pythocron_scriptfile_path).read()
        cron = CronTab(user="root")
        pythocron_jobs_matching_id_iterator = cron.find_comment(pythocron_id)
        pythocron_jobs_matching_id_list = [*pythocron_jobs_matching_id_iterator]
        if len(pythocron_jobs_matching_id_list) == 0:
            raise HTTPException(status_code=404, detail="Pythocron not found")
        elif len(pythocron_jobs_matching_id_list) == 1:

            return schemas.Pythocron(
                id=pythocron_id,
                script=pythocron_scriptfile_contents,
                schedule=str(pythocron_jobs_matching_id_list[0].slices),
            )
        else:
            raise HTTPException(
                status_code=422,
                detail="More than one pythocron found, please dont hack me",
            )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Pythocron not found")


@app.post("/pythocrons")
def create_pythocron(
    pythocron: schemas.PythocronCreate,
    settings: config.Settings = Depends(get_settings),
):
    pythocron_id = utils.generate_id()

    pythocron_logfile_path = f"{settings.logs_dir_path}/{pythocron_id}.log"
    pythocron_scriptfile_path = f"{settings.scripts_dir_path}/{pythocron_id}.py"

    with open(pythocron_scriptfile_path, "w") as pythocron_scriptfile:
        pythocron_scriptfile.write(pythocron.script)

    cron = CronTab(user="root")
    job = cron.new(
        command=f"/usr/local/bin/python {pythocron_scriptfile_path} >> {pythocron_logfile_path}",
        comment=pythocron_id,
    )
    job.setall(pythocron.schedule)
    cron.write()

    return {"pythocron_id": pythocron_id}


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
