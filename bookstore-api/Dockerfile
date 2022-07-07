FROM node:14
WORKDIR /bookstore-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start