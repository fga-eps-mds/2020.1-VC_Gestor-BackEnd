#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="guilhermeaguiar/news"                             # Docker image
GIT_VERSION=$(git describe --always --abbrev --tags --long) # Git hash and tags

# Build and tag image
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Log in to Docker Hub and push
echo "vVbyAABrPv5LLV6" | docker login -u "guilhermeaguiar" --password-stdin
docker push ${IMAGE}:${GIT_VERSION} 

ssh -i "deploy_rsa" ubuntu@ec2-18-191-150-245.us-east-2.compute.amazonaws.com  'bash -s' < docker_deploy.sh ${IMAGE}:${GIT_VERSION} $1