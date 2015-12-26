# Simple Github Webhook
A simple, Node.js based webhook meant for shell-script based deployment!

# Usage

## Step 1. Installing

Let's say you just want to use this for fast and easy deployment for your web project. First thing's first clone this repository and install the required dependencies.

```sh
git clone https://github.com/melonmanchan/simple-github-webhook
cd simple-github-webhook
npm install
```

## Step 2. Starting it up

The webhook takes in the following 4 parameters, passed through environment variables:


Variable  | Meaning | Default
------------- | ------------- | ------------- 
SECRET  | The GitHub secret for authentication | None (required!)
HOOK_PATH  | The sub-path that the script runs under | /
PORT  | The port the script runs under | 8080
BRANCH  | The git branch that the webhook is listening for commits | master

So for example, if you'd like to listen to changes to the feature-foo branch on port 1337 and run a script every time
someone commits to the branch in question, you'd start the webhook by:

```sh
PORT=1337 SECRET='My secret secret' BRANCH='feature-foo' npm start
```

Output:

```sh
GitHub webhook running at: 10.11.12.13:1337/
Listening for commits to branch refs/heads/feature-foo
```



