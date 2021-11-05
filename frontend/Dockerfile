FROM node:16-alpine
ARG REACT_APP_PYTHOCRON_BACKEND_URL
ADD pythocron /app
WORKDIR /app
RUN npm install && npm install -g serve && npm run build
CMD ["serve", "-s", "-l", "5000", "build"]
EXPOSE 5000