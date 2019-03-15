#!/bin/bash

source scripts/clean.sh
source scripts/prettier.sh
source scripts/lint.sh

echo "[BUILD]"
tsc --build src
