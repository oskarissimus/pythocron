# Python + Cron = Pythocron

Purpose of this project is to enable simple scheduled code execution. It's like cloud functions + scheduler with jupyter-notebook-like interface and user-friendliness.


## Running
```
# Cloning repo
git clone https://github.com/oskarissimus/pythocron.git
cd pythocron/backend

# Builing backend docker image
docker build -t pythocron .

# Running backend docker container
docker run -d -p 8000:8000 pythocron

# Go to frontend directory
cd ../frontend/pythocron

# Installing frontend dependencies
npm install

# Running frontend in dev mode
npm start
```

## Stopping
To stop, just exit `npm start` with `ctrl-c` and than stop backend with `docker stop pythocron`

## General architecture
### Backend

Backend is written in Python 3.8 + Fastapi. Poetry is responsible for dependency management. Python-crontab provides python interface for cron management.

Backend is wrapped in docker image. It is based on python:3.8-slim-buster. Tini is utilized to solve problems with running two services in container (cron and uvicorn for fastapi)

After starting backend there are auto-generated interactive docs on `localhost:8000/docs`

![Fastapi auto-generated interactive docs](docs/img/fastapi.png "Fastapi auto-generated interactive docs")


### Frontend
Frontend is made in React js.

![Main page](docs/img/mainpage.png "Main page")


## Contributing
Feel free to fork, create pull requests, and submit issues. This project is just starting, so there are a lot of bugs. If You find one, please create an issue, I will try to fix it!


## Todo list
- [ ] Create route `/{pythocron_id}` in frontend to show particular pythocron
- [ ] Display list of uploaded pythocrons
- [ ] Handle deleting, updating and deactivating pythocrons
- [ ] docker-compose
- [ ] Publish to docker hub
- [ ] Unit testing for backend
- [ ] Configure github actions to automathically build test and push to docker hub