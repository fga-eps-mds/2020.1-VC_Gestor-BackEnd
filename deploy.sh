#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="guilhermeaguiar/news"                             # Docker image
GIT_VERSION=$(git describe --always --abbrev --tags --long) # Git hash and tags

# Build and tag image
docker-compose build news
docker tag ${IMAGE}:942c6b9 ${IMAGE}:12345

# Log in to Docker Hub and push
echo "Elvismarley1" | docker login -u "guilhermeaguiar" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}