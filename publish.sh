#!/bin/sh
./build.sh

pwd=$(pwd)
npmrc=$(cat ~/.npmrc| base64)

export REPO=registry.gmdp.io

docker login $REPO

cd ./build

export DOCKER_TAG=$REPO/glonassmobile/toesim/web:latest
docker build --build-arg NPMRC=$npmrc -t $DOCKER_TAG .
docker push $DOCKER_TAG

cd $pwd

./deploy.sh latest dev
