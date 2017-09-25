FROM node:latest

WORKDIR /usr/src/engage

VOLUME ".:/usr/src/engage"

RUN npm i

EXPOSE 8081

CMD ["./node_modules/.bin/babel-node", "./index"]
