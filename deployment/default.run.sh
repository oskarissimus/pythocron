#!/bin/sh
envsubst < /app/deployment/default.conf.template > /app/deployment/default.nginx.conf
nginx -c /app/deployment/default.nginx.conf
uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0
