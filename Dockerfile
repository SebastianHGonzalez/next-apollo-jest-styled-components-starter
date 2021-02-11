FROM node:13.10.1-alpine3.11 AS build

ENV HOME=/opt/app NODE_ENV=development
WORKDIR $HOME

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run test \
    && npm run build

FROM node:13.10.1-alpine3.11

ENV HOME=/opt/app NODE_ENV=production PORT=3000

EXPOSE $PORT

WORKDIR $HOME

CMD ["npm", "start"]

COPY --from=build $HOME/package*.json ./

RUN npm i

COPY --from=build $HOME/src/public ./src/public

COPY --from=build $HOME/next.config.js ./next.config.js

COPY --from=build $HOME/.next ./.next
