FROM python:3.8-slim-buster
ENV POETRY_VIRTUALENVS_CREATE=false
ADD . /app
WORKDIR /app
RUN apt-get update && apt-get install -y cron tini && pip install -r requirements.txt && poetry install
ENTRYPOINT ["/usr/bin/tini", "-g",  "--"]
CMD ["sh", "-c", "cron && uvicorn pythocron.main:app --host=0.0.0.0 --reload"]
EXPOSE 8000