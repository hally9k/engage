FROM node:latest

WORKDIR /usr/src/engage

COPY . .

RUN export PATH=node_modules/.bin:$PATH

RUN npm i

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "start"]
