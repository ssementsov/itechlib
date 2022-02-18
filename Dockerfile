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
## SSH
RUN apt update && apt install openssh \
     && echo "root:Docker!" | chpasswd 
COPY sshd_config /etc/ssh/
RUN mkdir -p /tmp
COPY ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null)
##

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js



ENV SSH_PORT 2222
EXPOSE 3000 2222
CMD ["npm","run","start"]
