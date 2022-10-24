FROM node:16 as build
WORKDIR /build

COPY package*.json ./
COPY pnpm*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:16 as runtime
WORKDIR /usr/app
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist .
CMD [ "node", "main.js" ]
