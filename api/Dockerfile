FROM node:alpine

WORKDIR /app/node/api

COPY package*.json ./app/node/api

RUN yarn install

EXPOSE 3333

CMD yarn go
