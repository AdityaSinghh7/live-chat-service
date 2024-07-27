FROM node:22 AS development

WORKDIR /adityasingh/src/app

COPY package*.json ./

RUN npm install


EXPOSE 3000

CMD ["npm", "run", "start:dev"]

##################
####PRODUCTION####
##################

FROM node:22 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /adityasingh/src/app

COPY --from=development /adityasingh/src/app .

EXPOSE 8080

CMD ["node", "dist/main"]
