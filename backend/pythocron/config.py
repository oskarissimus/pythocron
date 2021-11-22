from pydantic import BaseSettings


class Settings(BaseSettings):
    data_dir_root: str = "/app"
    python_interpreter_path: str = "/usr/local/bin/python"
    # data_dir_root: str = "/home/oskar/git/pythocron/backend/data"
    # python_interpreter_path: str = "/home/oskar/.virtualenvs/pythocron/bin/python"

    logs_dir_path: str = f"/{data_dir_root}/logs"
    scripts_dir_path: str = f"/{data_dir_root}/scripts"
    crontab_path: str = f"/{data_dir_root}/crontab"
