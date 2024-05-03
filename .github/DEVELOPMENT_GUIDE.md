# Development guide

## Semantic versioning

We follow [semantic versioning](https://semver.org/) which means that we release patch versions for bug fixes, minor version for features and major for breaking changes.

Our release workflow is automated and to help us following best practices during development we use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) which adds a semantic pattern to commit messages representing the kind of change you are applying, whether is a bug, feature, breaking change or another type of change.

You can benefit of that by running the following command

```sh
pnpm commit
```

## Developing a component

1. Create a component

You can use the create component script as template, this command will generate the component skeleton with all necessary files, after that you can start developing the component. To use it just run the following command.

```sh
pnpm gen:component
```

2. Run storybook

We use [Storybook](https://storybook.js.org/) as a playground to help in the development process of components in Shoreline. To use it just run the following command.

```sh
pnpm dev:storybook
```

<!-- TODO: Maybe update the Storybook guidelines in case they move to a GH discussion or docs -->

Make sure that you read our [Storybook guidelines](https://github.com/vtex/shoreline/issues/1455) before you start developing components.

## What about tests?

All Shoreline components are tested by default and we have three types of tests:

1. Visual tests using [Storybook visual tests](https://storybook.js.org/docs/writing-tests/visual-testing).
2. Interactive tests using [Storybook visual tests](https://storybook.js.org/docs/writing-stories/play-function/).
3. Unit tests using [Vitest](https://vitest.dev/)

### Where does all Storybook stories go?

<!-- TODO: Add link to our public Storybook URL here once we upgrade Chromatic -->

We use [Chromatic](https://www.chromatic.com/) to power our Storybook documentation.

Chromatic is also the tool responsible for run the visual regression tests, by comparing the stable stories with the new ones after a change is made. We need to make a responsible use of this tool, so we take snapshots of our components from a single story containing all possible variations of a component, instead of taking snapshots of every single story. This is a good practice that helps us keep our Storybook documentation lean and easy to navigate.

## What about documentation?

[WIP]

## How does our CI/CD works?

We use GitHub Actions to run our CI/CD. We have a robust workflow that runs every time a:

1. PR is opened
2. PR is merged to the `main` branch

These workflows ensure that our code is always up to date and that we are not introducing any unexpected issues to our packages, as well as automates the process of generating the docs site, publishing new versions of our packages to NPM and deploying our storybook stories to Chromatic. Vercel takes care of deploying our docs website on a pipeline that runs in parallel with ours.

### Pull Request workflow

Our [Pull Request workflow](.github/workflows/pr.yml) runs the following steps:

1. Validates the PR title according to semantic commit rules to ensure that we are able to generate release notes from it
2. Builds all packages, ensuring their build is ok
3. Lints all JavaScript, TypeScript, and CSS files
4. Runs unit tests for all packages
5. Run interaction tests for all components
6. Publishes the components package to Chromatic, which in turn will run visual tests

### Release workflow

Our [Release workflow](.github/workflows/release.yml) runs the following steps:

1. Builds all packages, ensuring their build is ok
2. Stores the build artifacts on a temporary cache
3. Publishes the components package to Chromatic
4. Publishes all publishable packages to NPM
5. Retrieves the build artifacts from the cache
6. Generates a new version of the docs website from the retrieved build artifacts
7. Generates a release note
