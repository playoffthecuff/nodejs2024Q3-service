FROM node:22.9.0-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install && npm cache clean -f
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "./dist/main"]