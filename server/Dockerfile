FROM node:latest

WORKDIR /usr/src/engage

VOLUME ".:/usr/src/engage"

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

EXPOSE 8081

CMD ["npm", "start"]
