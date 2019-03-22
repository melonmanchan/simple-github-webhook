#!/usr/bin/env bash
set -e

[ -d repos ] || mkdir repos

REPO_TARGET=repos/$REPOSITORY_NAME

export GIT_ASKPASS=$PWD/token_credentials.sh

if [ ! -d $REPO_TARGET ]; then
    echo >&2 "Repository $REPOSITORY_NAME not found, cloning..."
    git clone --mirror $REPOSITORY_CLONE $REPO_TARGET
fi

cd $REPO_TARGET

n=0
while [[ $((n++)) -lt 5 ]]
do git fetch && break || echo >&2 "Fetch failed, retrying..."
done
