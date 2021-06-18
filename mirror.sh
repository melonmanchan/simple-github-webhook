#!/usr/bin/env bash
set -ex

[ "$REPOSITORY_NAME" ] || REPOSITORY_NAME=$1

if [ -z "$REPOSITORY_NAME" ]; then
    echo "REPOSITORY_NAME missing!" >&2
    exit 1
fi

REPOS_DIR=$(dirname $0)/repos

[ -d "$REPOS_DIR" ] || mkdir "$REPOS_DIR"

REPO_TARGET="$REPOS_DIR/$REPOSITORY_NAME"

[ -z "$TOKEN_CREDENTIALS" ] && TOKEN_CREDENTIALS="$(cd $(dirname $0); pwd)/token_credentials.sh"
export GIT_ASKPASS="$TOKEN_CREDENTIALS"

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
