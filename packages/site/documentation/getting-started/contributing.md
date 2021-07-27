---
path: /getting-started/contributing/
---

# Contributing

VTEX Admin v4 is a collaborative effort. We want to make contributing to this project as easy and transparent as possible, and this document aims to guide you through the process. If your questions weren't clarified here, feel free to reach us at #dev-design-system. Follow the steps below to contribute to our VTEX Admin v4's development.

## Tools and conventions

### Issues: where the conversation happens

We are using [GitHub Issues](https://github.com/vtex/onda/issues) for our public bugs, new features, and discussions. We keep a close eye on this and try to make it clear when we have an internal fix or feature in progress. Feel free to create new issues and open discussions about anything that you think it's relevant to the project. However, before filing a new task, make sure your issue doesn’t already exist.

### Storybook

We use storybook as a canvas to create stories and as a preview of our components features. It's really useful to share with the designers and check if the component has the expected behavior.

### Commit messages

It is essential that all commits follow an established convention. We ask you to please take the time to understand semantic versioning before committing.

**Tools:** We use [commitlint](https://commitlint.js.org/#/) and [commitizen](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/).
**Messages:** As a shorthand, we always use the `git cz` command to ensure that we are following our commitlint.

## Development Workflow

Follow the instructions below to get started on development.

### 1. Getting started

1.  Clone the repository `vtex/onda`.
2.  Run yarn to fetch its dependencies.
3.  Run commands of your choosing.
4.  Run yarn test.

**Available Commands:**

- yarn build: builds the entire repository and its packages
- yarn test: runs the complete test suite
- yarn lint: checks the code style
- yarn admin:site: runs the documentation site locally
- yarn build-site:admin: builds the documentation site
- yarn storybook:admin: runs the storybook locally
- yarn build-storybook:admin: builds storybook

### 2. Your First Pull Request

To help you get your feet wet and get you familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment, and assign yourself in the issue, stating that you intend to work on it so other people don’t accidentally duplicate your effort.

### 3. Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

Before submitting a pull request:, please make sure the following is done:

1.  Clone the repository and create your branch from master.
2.  Run yarn: in the repository root.
3.  If you’ve fixed a bug or added code that should be tested, add tests.
4.  If you've created a new component or added a new feature, add stories in the storybook.
5.  Ensure the test suite passes (yarn test).
6.  Format your code with prettier (yarn prettier).
7.  Make sure your code lints (yarn lint).
8.  Run yarn build:, yarn build-storybook:admin: or yarn build-site:admin: to ensure that the builds are still working.

### 4. Publishing Packages

We use Lerna combined with the Conventional Commits to publish our packages.

- fix:: a commit of the type fix patches a bug in your codebase. It will relase a `PATCH` version.
- feat:: a commit of the type feat introduces a new feature to the codebase. It will release a `MINOR` version.

**Publish commands**

- yarn publish:packages: runs the lerna publish: command, and if it has a fix or a feat commit it will release a new version of the package changed.

### 5. Request for Comments (RFC)

Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.
However, in case of substantial changes, they should follow a design process and there must be a consensus about the topic in the onda-core-team:.
The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.
