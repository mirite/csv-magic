FROM alpine AS environment
RUN apk update
RUN apk add --upgrade brotli nginx nginx-mod-http-brotli
WORKDIR /app
COPY ./dist ./dist
RUN find . -type f -exec brotli {} \;

# Stage 2: Serve the deploy tool using Nginx
FROM environment AS server
WORKDIR /app
COPY --from=environment /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
