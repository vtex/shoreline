# scripts

This directory contains scripts that are used on the CI/CD pipelines.

## [`configure-git-user.sh`](configure-git-user.sh)

Randomly picks a Shoreline member and sets it as the git user. This makes it possible to automate deployments of the documentation site to Vercel.

To test this script locally, run:

```bash
LOCAL_TEST=1 sh configure-git-user.sh
```
