FROM node:16-alpine
ADD pythocron /app
WORKDIR /app
RUN npm install --no-audit
CMD ["npm", "start"]