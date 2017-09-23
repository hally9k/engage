FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 8082

CMD ["./node_modules/.bin/babel-node", "index.js"]
