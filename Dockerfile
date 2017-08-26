FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm i && ./node_modules/.bin/webpack

EXPOSE 8080

CMD ["npm", "start" ]
