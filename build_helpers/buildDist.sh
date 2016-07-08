#!/bin/bash

set -e
PATH=$(npm bin):$PATH

rm -rf ./dist
webpack
