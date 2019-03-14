#!/bin/bash

echo "[PRETTIER]"
prettier --loglevel silent --write "**/specs/**/*.ts"
prettier --loglevel silent --write "**/src/**/*.ts"
