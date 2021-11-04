from pydantic import BaseSettings


class Settings(BaseSettings):
    logs_dir_path: str = "/app/data/logs"
    scripts_dir_path: str = "/app/data/scripts"
