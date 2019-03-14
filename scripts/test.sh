#!/bin/bash

source scripts/build.sh

DEBUG=
DOWNLOAD_FILE=".cache/sample-video.mp4"
DOWNLOAD_URL="http://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"

if [ ! -f "$DOWNLOAD_FILE" ]; then
  echo "Downloading sample video..."
  curl --silent -o "$DOWNLOAD_FILE" $DOWNLOAD_URL
fi

echo "[TEST]"
nyc mocha --opts mocha.opts
