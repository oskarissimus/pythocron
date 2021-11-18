FROM node:16-alpine
ARG REACT_APP_PYTHOCRON_BACKEND_URL
ENV PORT="5000"
ADD pythocron /app
WORKDIR /app
RUN npm install && npm install -g serve && npm run build
CMD ["serve", "-s", "-l", ${PORT}, "build"]
EXPOSE ${PORT}