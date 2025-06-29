# Build Stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN apk add --no-cache gettext
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
