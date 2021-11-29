FROM node:16.13-buster
RUN cp -r /src/* /public/* package.json package-lock.json ./app
WORKDIR /app
RUN npm install & npm run build
EXPOSE 3000
CMD CMD ["npm","run","start"] 
