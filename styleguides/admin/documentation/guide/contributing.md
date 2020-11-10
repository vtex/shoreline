---
path: /docs/guide/contributing/
---

# Contributing

## Commit messages

We use [commitlint](https://commitlint.js.org/#/) and [commitizen](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/). Please take the time to understand semantic versioning before committing.

As a shorthand, we always use the <highlight message="git cz"></highlight> command to ensure that we are following our commitlint.

## Issues

We are using GitHub Issues for our public bugs, new features, and discussions. We keep a close eye on this and try to make it clear when we have an internal fix or feature in progress. Before filing a new task, try to make sure your issue doesn’t already exist. Feel free to create new issues and open discussions about anything that you think it's relevant to the project.

## Development Workflow

After cloning `vtex/onda`, run yarn to fetch its dependencies. Then, you can run several commands:

- <highlight message="yarn build"></highlight> builds the entire repository and its packages
- <highlight message="yarn test"></highlight> runs the complete test suite
- <highlight message="yarn lint"></highlight> checks the code style
- <highlight message="yarn admin:site"></highlight> runs the documentation site locally
- <highlight message="yarn build-site:admin"></highlight> builds the documentation site
- <highlight message="yarn storybook:admin"></highlight> runs the storybook locally
- <highlight message="yarn build-storybook:admin"></highlight> builds storybook

We recommend running <highlight message="yarn test"></highlight> to make sure you don’t introduce any regressions as you work on your change.

## Storybook

We use storybook as a canvas to create stories and as a preview of our components features. It's really useful to share with the designers and check if the component has the expected behavior.

## Your First Pull Request

To help you get your feet wet and get you familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment, and assign yourself in the issue, stating that you intend to work on it so other people don’t accidentally duplicate your effort.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

<highlight message="Before submitting a pull request"></highlight>, please make sure the following is done:

1. Clone the repository and create your branch from master.
2. Run <highlight message="yarn"></highlight> in the repository root.
3. If you’ve fixed a bug or added code that should be tested, add tests!
4. If you've created a new component or added a new feature, add stories in the storybook!
5. Ensure the test suite passes (yarn test).
6. Format your code with prettier (yarn prettier).
7. Make sure your code lints (yarn lint).
8. Run <highlight message="yarn build"></highlight>, <highlight message="yarn build-storybook:admin"></highlight> or <highlight message="yarn build-site:admin"></highlight> to ensure that the builds are still working.

## Publish Packages

We use Lerna combined with the Conventional Commits to publish our packages.

- <highlight message="fix:"></highlight> a commit of the type fix patches a bug in your codebase. It will relase a `PATCH` version.
- <highlight message="feat:"></highlight> a commit of the type feat introduces a new feature to the codebase. It will release a `MINOR` version.

Publish commands:

- <highlight message="yarn publish:packages"></highlight> runs the <highlight message="lerna publish"></highlight> command, and if it has a fix or a feat commit it will release a new version of the package changed.

## Request for Comments (RFC)

Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

However, in case of substantial changes, they should follow a design process and there must be a consensus about the topic in the <highlight message="onda-core-team"></highlight>.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.
