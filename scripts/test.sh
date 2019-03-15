#!/bin/bash

source scripts/build.sh

DEBUG=

echo "[TEST]"
nyc mocha --opts mocha.opts
