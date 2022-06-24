FROM node:16.13.1

RUN mkdir -p /usr/src/main
WORKDIR /usr/src/main

COPY package*.json ./

RUN npm install
COPY . .

COPY ./dist ./dist

CMD ["npm", "start"]