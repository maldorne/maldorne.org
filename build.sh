#!/bin/bash

# generate dgd documenation pages
cd web/source/docs/dgd
./generate.sh

# build the hexo blog
cd ../../..
npm run build
