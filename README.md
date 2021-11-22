# Python + Cron = Pythocron

Purpose of this project is to enable simple scheduled code execution. It's like cloud functions + scheduler with jupyter-notebook-like interface and user-friendliness.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running
```
docker run -p 8080:2137 oskarissimus/pythocron
```
## Building docker images from repo
```
# Cloning repo
git clone https://github.com/oskarissimus/pythocron.git
cd pythocron

# Docker build and run
docker build -t pythocron -f default.Dockerfile .
docker run -p 8000:2137 pythocron
```

Than go to http://localhost:8000

You can also use backend directly http://localhost:8000/api/v1/docs

## Running dev
### backend
```
# please use virtual envs for own sanity
cd backend
mkvirtualenv pythocron
pip install -r requrements.txt
poetry isntall
poetry run uvicorn pythocron.main:app --host=0.0.0.0 --reload
# project uses crontab as root, so have that in mind while running dev
```
### frontend
```
cd frontend
# Installing frontend dependencies
npm install

# Running frontend in dev mode
npm start
```
To stop, just exit `npm start` with `ctrl-c`

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
- [x] Create route `/{pythocron_id}` in frontend to show particular pythocron
- [x] Display list of uploaded pythocrons
- [x] Handle deleting pythocrons
- [x] docker-compose
- [x] Responsive design
- [x] Handle updating pythocrons
- [x] Publish to docker hub
- [x] Configure github actions to automathically build and push to docker hub
- [ ] Unit testing for backend
- [ ] Handle deactivating pythocrons
- [ ] Configure github actions to run tests
