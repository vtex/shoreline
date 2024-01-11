# scripts

This directory contains scripts that are used on the CI/CD pipelines.

## [`configure-git-user.sh`](configure-git-user.sh)

Randomly picks a Shoreline member and sets it as the git user. This makes it possible to automate deployments of the documentation site to Vercel.

User and email are set as secret variables in the CI/CD pipelines.

### Testing

To test this script locally, run:

```bash
LOCAL_TEST=1 GIT_USERS="abc def ghi jkl" GIT_EMAILS="abc@email.com def@email.com ghi@email.com jkl@email.com" sh configure-git-user.sh
```
