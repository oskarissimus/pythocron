FROM python:3.8-slim-bullseye
RUN apt-get update && \
    apt-get install -y cron tini nginx nodejs npm gettext-base openssh-server curl
