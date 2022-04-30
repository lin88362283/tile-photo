FROM node:16
WORKDIR /tile-photo
COPY package.json /tile-photo
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY . /tile-photo
ENTRYPOINT ["ts-node", "index.ts"]