ARG NODE_TAG

FROM node:${NODE_TAG} as builder

RUN apk add --no-cache cmake curl

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /nuxt

COPY . .

RUN pnpm i
