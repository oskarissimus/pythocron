FROM python:3.8-slim-bullseye
ENV POETRY_VIRTUALENVS_CREATE=false
RUN apt-get update
RUN apt-get install -y cron tini nginx nodejs npm gettext-base

ENV REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1"
ADD frontend/pythocron /app/frontend/pythocron
WORKDIR /app/frontend/pythocron
RUN npm install
RUN npm run build

ADD backend /app/backend
WORKDIR /app/backend
RUN pip install -r requirements.txt && poetry install

ADD deployment /app/deployment
WORKDIR /app/deployment
ENV PORT=2137
RUN chmod u+s /usr/sbin/cron /usr/bin/tini
RUN chmod -R 777 /app
ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/heroku.run.sh"]