# scripts

This directory contains scripts that are used on the CI/CD pipelines.

## [`configure-git-user.sh`](configure-git-user.sh)

Randomly picks a Shoreline member and sets it as the git user. This makes it possible to automate deployments of the documentation site to Vercel.

User and email are set as secret variables in the CI/CD pipelines and you can refer to their values by visiting our doc (only available for VTEXers) here: [GIT_USERS and GIT_EMAILS from vtex/shoreline](https://docs.google.com/spreadsheets/d/1DWNqJED40wceC5Qmd56sEKPnir8rjktt6mzOPuhtQBM/edit#gid=0).

### Testing

To test this script locally, run:

```bash
LOCAL_TEST=1 GIT_USERS="abc def ghi jkl" GIT_EMAILS="abc@email.com def@email.com ghi@email.com jkl@email.com" sh configure-git-user.sh
```
