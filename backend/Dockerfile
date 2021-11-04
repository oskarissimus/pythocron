FROM python:3.8-slim-buster
RUN apt-get update
RUN apt-get install -y cron tini
ADD requirements.txt /app/requirements.txt
ADD pyproject.toml /app/pyproject.toml
WORKDIR /app
RUN pip install -r requirements.txt
ENV POETRY_VIRTUALENVS_CREATE=false
RUN poetry install
ADD . /app
ENTRYPOINT ["/usr/bin/tini", "-g",  "--"]
CMD ["sh", "-c", "cron && uvicorn pythocron.main:app --host=0.0.0.0 --reload"]
