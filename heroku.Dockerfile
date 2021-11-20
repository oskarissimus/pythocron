FROM oskarissimus/heroku-pythocron-base

ENV POETRY_VIRTUALENVS_CREATE=false
ENV REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1"
ENV PORT=2137

ADD . /app

RUN cd /app/frontend/pythocron && \
    npm install && npm run build && \
    cd /app/backend && \
    pip install -r requirements.txt && poetry install && \
    chown root:root /usr/sbin/cron && \
    chmod u+s /usr/sbin/cron /usr/bin/tini && \
    chmod -R 777 /app && \
    rm /bin/sh && ln -s /bin/bash /bin/sh

ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/heroku.run.sh"]