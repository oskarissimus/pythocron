#!/bin/sh
envsubst < /app/deployment/default.nginx.conf.template > /app/deployment/default.nginx.conf
nginx -c /app/deployment/default.nginx.conf
uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0
