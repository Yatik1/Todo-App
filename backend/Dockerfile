FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5555

EXPOSE 5555

CMD ["npm" , "start"]