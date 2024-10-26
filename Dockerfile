FROM node:latest as node
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build

FROM nginx:latest
COPY --from=node /app/dist/read-list /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
