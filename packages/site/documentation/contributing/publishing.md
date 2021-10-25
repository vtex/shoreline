---
title: Publishing Versions
path: /contributing/publishing/
---

# Publishing Versions

Nowadays, we are publishing our versions manually in the repository, and these are some things that you should be aware of before publishing a package.

**Conventional commits**

The releases are made based on the commits messages, so when running the publish command, the Lerna will look for the pattern that represents a new release in the commits. You should read [this quick documentation](https://www.conventionalcommits.org/en/v1.0.0/) for detailed info

**NPM**

You must be logged in to your account through the terminal and also must be in the VTEX organization, so you’ll have permission to publish a package.

**Repository permissions**

When publishing a package you must have permission to make `git push` directly on the `master` branch, otherwise, it won’t work.

**Lerna**

We use Lerna to control the operations through all of our packages on onda. Interesting links: [Lerna documentation](https://github.com/lerna/lerna), [Lerna config on Onda](https://github.com/vtex/onda/blob/master/lerna.json).

## Publish Flow

Once you merge the changes within the `master` branch, you should update your local branch, and then run `yarn publish:main`.

We defined this command to make it easier to release a package, but under the hood, it will run the following commands:

1. `yarn`
2. `yarn lerna run build` - It builds all the packages from the repository, and without this command, the npm package won't have the current changes when published.
3. `yarn lerna publish` - It will look for all the packages and publish only the ones that have been changed.
