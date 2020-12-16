#!/usr/bin/env bash
cd $(dirname $0)
for repo_ in repos/*; do repo=${repo_/repos\//}; ./mirror.sh $repo; done 
