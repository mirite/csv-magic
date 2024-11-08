FROM node:22-alpine AS node
RUN mkdir -p /app
WORKDIR /app
RUN corepack enable
RUN apk update
RUN apk add --upgrade brotli

FROM node AS environment
COPY ./.yarnrc.yml .
COPY package.json .
COPY yarn.lock .

RUN yarn install

FROM node AS build
WORKDIR /app
COPY --from=environment /app/node_modules ./node_modules
COPY --from=environment /app/package.json ./package.json
COPY --from=environment /app/yarn.lock ./yarn.lock

COPY . .

RUN yarn build
WORKDIR /app/dist
RUN find . -type f -exec brotli {} \;

# Stage 2: Serve the deploy tool using Nginx
FROM alpine AS server

RUN apk add brotli nginx nginx-mod-http-brotli

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
