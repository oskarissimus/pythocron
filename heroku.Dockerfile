FROM python:3.8-slim-bullseye

ENV POETRY_VIRTUALENVS_CREATE=false
ENV REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1"
ENV PORT=2137

ADD . /app

RUN apt-get update && \
    apt-get install -y cron tini nginx nodejs npm gettext-base && \
    cd /app/frontend/pythocron && \
    npm install && npm run build && \
    cd /app/backend && \
    pip install -r requirements.txt && poetry install && \
    chmod u+s /usr/sbin/cron /usr/bin/tini && \
    chmod -R 777 /app
ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/heroku.run.sh"]