FROM node:lts-alpine
WORKDIR /home/devops/Downloads
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]