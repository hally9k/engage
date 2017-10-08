FROM node:latest

WORKDIR /usr/src/engage

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

EXPOSE 8081

CMD ["npm", "start"]
