FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=production

COPY server/package*.json server/
RUN npm run install-server --omit=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm","start","--prefix","server"]

EXPOSE 5000