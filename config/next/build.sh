#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [ "$DISABLE_BUILD_LINTING" = "false" ]; then
  npx biome check
fi

npx next build
