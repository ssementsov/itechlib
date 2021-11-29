FROM node:16.13-buster
WORKDIR dist
EXPOSE 3000
CMD CMD ["npm","run","start"] 
