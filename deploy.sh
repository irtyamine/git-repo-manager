#!/bin/bash

PROJECT_NAME=git-repo-manager
DOCKER_IMAGE_NAME=git-repo
ZONE_EN1B=us-east1-b
PORT=8080

echo "docker build"
docker build -t gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:$TRAVIS_COMMIT \
  --build-arg URL=$URL \
  --build-arg PORT=$PORT \
  --build-arg MONGO_URL=$MONGO_URL \
  --build-arg ACCESS_TOKEN=$ACCESS_TOKEN \
  --build-arg GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
  --build-arg GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET \
  --build-arg ACCESS_GITHUB_ORGANIZATION=$ACCESS_GITHUB_ORGANIZATION \
.

echo Connect to GCloud
echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone $ZONE_EN1B

gcloud app deploy 

# echo "docker push"
# gcloud docker -- push gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:$TRAVIS_COMMIT
# yes | gcloud beta container images add-tag gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:$TRAVIS_COMMIT gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:latest

# echo "Create instance"
# gcloud beta compute instances create-with-container instance-1 \
#   --zone $ZONE_EN1B \
#   --container-image=gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:latest \
#   --machine-type=n1-standard-2 \
#   --tags app

# echo "Update instance"
# gcloud beta compute instances update-container instance-1 \
#   --zone $ZONE_EN1B \
#   --container-image=gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:latest \

# echo "Create firewall-rules"
# gcloud compute firewall-rules create port-forwarding-3000 \
#     --action allow \
#     --rules tcp:3000 \
#     --source-ranges=0.0.0.0/0 \
#     --priority 1000
