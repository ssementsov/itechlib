FROM node:16.13.0-stretch
RUN npm run install
WORKDIR /app
COPY .next/ /app
CMD npm run start 
EXPOSE 3000
