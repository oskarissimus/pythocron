#!/bin/sh
bash /app/.profile.d/heroku-exec.sh
whoami
cron
envsubst < /app/deployment/heroku.nginx.conf.template > /app/deployment/heroku.nginx.conf
nginx -c /app/deployment/heroku.nginx.conf
uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0
