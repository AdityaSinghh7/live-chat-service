FROM node:22 AS development

WORKDIR /adityasingh/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]

##################
####PRODUCTION####
##################

FROM node:22 AS production

WORKDIR /adityasingh/frontend/src/app

COPY --from=development /adityasingh/frontend/src/app .

EXPOSE 80

CMD ["npm", "run", "serve:ssr:frontend"]
