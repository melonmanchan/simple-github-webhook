#!/usr/bin/env bash
set -e

export GIT_ASKPASS=$PWD/token_credentials.sh

if [ ! -d $REPOSITORY_NAME ]; then
    echo >&2 "Repository $REPOSITORY_NAME not found, cloning..."
    git clone --mirror $REPOSITORY_CLONE $REPOSITORY_NAME
fi

cd $REPOSITORY_NAME

n=0
while [[ $((n++)) -lt 5 ]]
do git fetch && break || echo >&2 "Fetch failed, retrying..."
done
