FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

EXPOSE 8083

CMD ["npm", "start"]
