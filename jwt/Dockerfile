FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

EXPOSE 8082

CMD ["./node_modules/.bin/babel-node", "index.js"]
