FROM node:alpine

WORKDIR /urs/app/proxies

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 7001

CMD ["npm", "start"]
