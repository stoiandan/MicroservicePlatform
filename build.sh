#!/bin/env bash

cd ./login
npm install 
npm run build
cd ..
docker-compose build
docker-compose up

