FROM oskarissimus/heroku-pythocron-base

ENV POETRY_VIRTUALENVS_CREATE=false \
    REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1" \
    PORT=2137

ADD . /app

RUN cd /app/frontend/pythocron && \
    npm install --verbose && npm run build && \
    cd /app/backend && \
    pip install -r requirements.txt && poetry install && \
    rm /bin/sh && ln -s /bin/bash /bin/sh

ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/heroku.run.sh"]