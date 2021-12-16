FROM node:16.13-buster
RUN mkdir /app
RUN cp -r /src/* /public/* package.json package-lock.json ./app
RUN npm install & npm run build
WORKDIR /app
EXPOSE 3000
CMD CMD ["npm","run","start"] 
