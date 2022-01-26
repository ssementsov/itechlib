FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY dev.crt /etc/ssl/ssl.crt
COPY dev.key /etc/ssl/ssl.key
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
