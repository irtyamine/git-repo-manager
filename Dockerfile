FROM node:10

RUN mkdir git-repo

WORKDIR /git-repo

COPY package.json /git-repo

RUN npm install

COPY . /git-repo

EXPOSE 3000

CMD npm run start
