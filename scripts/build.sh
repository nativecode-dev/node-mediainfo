#!/bin/bash

source scripts/clean.sh
source scripts/lint.sh
source scripts/prettier.sh

echo "[BUILD]"
tsc --project tsconfig.json
