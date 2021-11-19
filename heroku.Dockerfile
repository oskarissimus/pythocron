FROM python:3.8-slim-bullseye
ENV POETRY_VIRTUALENVS_CREATE=false
RUN apt-get update
RUN apt-get install -y cron tini nginx nodejs npm

ENV REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1"
ADD frontend/pythocron /app/frontend/pythocron
WORKDIR /app/frontend/pythocron
RUN npm install
RUN npm run build

ADD backend /app/backend
WORKDIR /app/backend
RUN pip install -r requirements.txt && poetry install

ADD deployment /app/deployment

ENTRYPOINT ["/usr/bin/tini", "-g",  "--"]
CMD ["sh", "-c", "cron && nginx -c /app/deployment/heroku.nginx.conf -g 'listen 2137;' && uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0"]
EXPOSE 2137