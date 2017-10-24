FROM node:latest

WORKDIR /usr/src/engage

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

RUN BUILD_ENV=production NODE_ENV=production ./node_modules/.bin/webpack

EXPOSE 8080

CMD ["npm", "start"]
