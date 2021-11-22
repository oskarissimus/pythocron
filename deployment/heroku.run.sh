#!/bin/sh
bash /app/.profile.d/heroku-exec.sh
envsubst < /app/deployment/heroku.nginx.conf.template > /app/deployment/heroku.nginx.conf
nginx -c /app/deployment/heroku.nginx.conf
uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0
