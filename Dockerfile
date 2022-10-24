FROM node:16 as build

WORKDIR /build

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

FROM node:16 as runtime
WORKDIR /app
COPY --from=build /build/dist .
CMD [ "node", "main.js" ]
