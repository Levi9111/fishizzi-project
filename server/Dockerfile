# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist ./dist/

# Replace with your server's port
EXPOSE 8080

CMD [ "node", "dist/server.js" ]