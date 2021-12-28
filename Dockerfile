FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --prod && yarn cache clean

COPY . .

RUN yarn build-ts

CMD [ "yarn", "run-dist" ]
