FROM oskarissimus/heroku-pythocron-base

ENV POETRY_VIRTUALENVS_CREATE=false \
    REACT_APP_PYTHOCRON_BACKEND_URL="/api/v1" \
    PORT=2137 \
    SUPERCRONIC_URL=https://github.com/aptible/supercronic/releases/download/v0.1.12/supercronic-linux-amd64 \
    SUPERCRONIC=supercronic-linux-amd64 \
    SUPERCRONIC_SHA1SUM=048b95b48b708983effb2e5c935a1ef8483d9e3e

ADD . /app

RUN curl -fsSLO "$SUPERCRONIC_URL" && \
    echo "${SUPERCRONIC_SHA1SUM}  ${SUPERCRONIC}" | sha1sum -c - && \
    chmod +x "$SUPERCRONIC" && \
    mv "$SUPERCRONIC" "/usr/local/bin/${SUPERCRONIC}" && \
    ln -s "/usr/local/bin/${SUPERCRONIC}" /usr/local/bin/supercronic && \
    cd /app/frontend/pythocron && \
    npm install --verbose && npm run build && \
    cd /app/backend && \
    pip install -r requirements.txt && poetry install && \
    rm /bin/sh && ln -s /bin/bash /bin/sh

ENTRYPOINT ["/usr/bin/tini", "-sg",  "--"]
CMD ["/app/deployment/heroku.run.sh"]