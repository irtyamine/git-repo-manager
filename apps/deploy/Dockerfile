FROM node:10

RUN mkdir -p /git-repo
WORKDIR /git-repo
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY ./ ./
RUN npm run server:build
RUN npm run client:build:prod


# ARG ACCESS_TOKEN
# ENV ACCESS_TOKEN ${ACCESS_TOKEN}

# ARG APP_URL
# ENV APP_URL ${APP_URL}

# ARG DB_URL
# ENV DB_URL ${DB_URL}

# ARG GITHUB_CLIENT_ID
# ENV GITHUB_CLIENT_ID ${GITHUB_CLIENT_ID}

# ARG GITHUB_CLIENT_SECRET
# ENV GITHUB_CLIENT_SECRET ${GITHUB_CLIENT_SECRET}

# ARG PORT
# ENV PORT ${PORT}


EXPOSE 8080

CMD ["npm", "run", "start:prod"]
