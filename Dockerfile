FROM node:16.13-buster
WORKDIR /app
RUN cp -r /src/* /public/* package.json package-lock.json ./app
RUN npm install & npm run build
EXPOSE 3000
CMD CMD ["npm","run","start"] 
