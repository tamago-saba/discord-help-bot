FROM node:18-bullseye

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . .
RUN npm install

CMD ["npm", "run", "start"]
