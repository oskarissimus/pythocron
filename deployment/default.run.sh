#!/bin/sh
nginx -c /app/deployment/default.nginx.conf
uvicorn pythocron.main:app --root-path=/api/v1 --host=0.0.0.0
