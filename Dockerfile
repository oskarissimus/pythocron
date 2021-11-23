FROM python:3.8-slim-bullseye

ENV POETRY_VIRTUALENVS_CREATE=false \
    REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1" \
    PORT=2137

RUN apt-get update && \
    apt-get install -y tini nginx nodejs npm gettext-base

ADD . /app
WORKDIR /app/frontend/pythocron
RUN npm install && npm run build

WORKDIR /app/backend
RUN pip install -r requirements.txt && poetry install

ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/default.run.sh"]
EXPOSE 2137