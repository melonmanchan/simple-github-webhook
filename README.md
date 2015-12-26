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

While you're at it, you should also edit the deploy.sh script to be more suitable for your deployment needs.

## Step 2. Starting it up

The webhook takes in the following four parameters, passed in through environment variables:


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

## Step 2. Setting up your repository on GitHub

First, go to your repository's setting page, click on "Webhooks and services", and click on the button on the top right, labeled "Add webhook"

![](http://i.imgur.com/r2W5fA0.png)

GitHub will then prompt you for your password.

Next, fill in the correct URL, path and secret that you specified and received while starting the webhook.

![](http://i.imgur.com/hajyFuD.png)

That should be enough to get your webhook up and running! Feel free to make a test commit or two to the branch you specified at the start to test it.

```sh
Running deployment now...
# SCRIPT OUTPUT HERE
Deployment finished!
```



