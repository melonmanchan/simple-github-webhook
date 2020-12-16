#!/usr/bin/env bash
set -ex

[ "$REPOSITORY_NAME" ] || REPOSITORY_NAME=$1

if [ -z "$REPOSITORY_NAME" ]; then
    echo "REPOSITORY_NAME missing!" >&2
    exit 1
fi

[ -d repos ] || mkdir repos

REPO_TARGET=repos/$REPOSITORY_NAME

export GIT_ASKPASS=$PWD/token_credentials.sh

if [ ! -d $REPO_TARGET ]; then
    echo >&2 "Repository $REPOSITORY_NAME not found, cloning..."
    if [ "$REPOSITORY_CLONE" ]; then
        git clone --mirror --config core.sharedRepository=true $REPOSITORY_CLONE $REPO_TARGET
    else
        echo >&2 "REPOSITORY_CLONE missing!"
        exit 1
    fi
fi

cd $REPO_TARGET

n=0
while [[ $((n++)) -lt 5 ]]
do git fetch --prune && break || echo >&2 "Fetch failed, retrying..."
done
