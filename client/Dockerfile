FROM node:latest

WORKDIR /usr/src/engage

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

RUN ./node_modules/.bin/webpack

EXPOSE 8080

CMD ["npm", "start"]
