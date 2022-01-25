FROM node:16.13-buster AS deps
WORKDIR /app
COPY *.*  ./
RUN npm install -g npm@8.3.0
RUN npm install


FROM node:16.13-buster AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:16.13-buster
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm","run","start"]
