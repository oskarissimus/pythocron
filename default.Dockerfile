FROM python:3.8-slim-bullseye

ENV POETRY_VIRTUALENVS_CREATE=false \
    REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1"

ADD . /app

RUN apt-get update && \
    apt-get install -y tini nginx nodejs npm && \
    cd /app/frontend/pythocron && \
    npm install --verbose && npm run build && \
    cd /app/backend && \
    pip install -r requirements.txt && poetry install

ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/default.run.sh"]
EXPOSE 2137