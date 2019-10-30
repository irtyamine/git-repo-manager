
#!/bin/bash

PROJECT_NAME=git-repo-manager
DOCKER_IMAGE_NAME=git-repo
ZONE_EN1B=us-east1-b
PORT=8080

echo "docker build"
docker build -t gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:$TRAVIS_COMMIT \
  --build-arg ACCESS_TOKEN=$ACCESS_TOKEN \
  --build-arg APP_URL=$APP_URL \
  --build-arg DB_URL=$DB_URL \
  --build-arg GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
  --build-arg GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET \
  --build-arg PORT=$PORT \
.

echo Connect to GCloud
echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone $ZONE_EN1B

gcloud app deploy
