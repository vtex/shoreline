# 🌊 Shoreline <!-- omit in toc -->

Shoreline is a set of tools designed specifically to enhance the experience of designing and implementing apps for the VTEX Admin. The focus is on simplifying the application design, creation, coding, visualization, and QA processes.

- [How to develop locally?](#how-to-develop-locally)
  - [Components](#components)
    - [What about tests?](#what-about-tests)
    - [Where does all Storybook stories go?](#where-does-all-storybook-stories-go)

## How to develop locally?

After you clone this repo, run the following commands to install the dependencies and build the packages:

```bash
pnpm i && pnpm build
```

Now you can run any of the following commands to run the desired package:

```bash
pnpm dev # [*] runs all packages at once <- don't use it
pnpm test # [*] runs all tests from all components at once
pnpm clean # [*] useful if you want to clean all packages at once - since they are linked, sometimes a rebase not followed by a fresh reinstall can cause some issues
pnpm dev:storybook # [components package] runs its storybook alongside the styles package
pnpm dev:docs # [docs package] runs the docs website
```

### Components

To develop components, you can use the `pnpm dev:storybook` command. It will run the Storybook for the components package and the styles package at the same time. The styles package is a dependency of the components package, so it will be linked to it and any changes you make to the styles package will be reflected in the components package.

<!-- TODO: Maybe update the Storybook guidelines in case they move to a GH discussion or docs -->

Make sure that you read our [Storybook guidelines](https://github.com/vtex/shoreline/issues/1455) before you start developing components.

#### What about tests?

We use [Storybook](https://storybook.js.org/) to test our components.

All Shoreline components are tested by default. We have a CI/CD in place which tests whether components render or fail to render through all our Storybook stories, using [Playwright](https://playwright.dev/), and there are interactive tests that replicate user behaviour in place for most components, using Storybook's [play function](https://storybook.js.org/docs/writing-stories/play-function/). Beyond that, we also have [visual tests](https://storybook.js.org/docs/writing-tests/visual-testing) in place to make sure that we are not introducing any unexpected visual regression to our components.

#### Where does all Storybook stories go?

<!-- TODO: Add link to our public Storybook URL here once we upgrade Chromatic -->

We use [Chromatic](https://www.chromatic.com/) to power our Storybook documentation. This is the tool that takes screenshots of all our stories and compares them to the previous version of our Storybook to make sure that we are not introducing any unexpected visual regression to our components.

We also make a responsible use of Chromatic, by taking snapshots of our components from a single story containing all possible variations of a component, instead of taking snapshots of every single story. This is a good practice that helps us keep our Storybook documentation lean and easy to navigate. Now go back and read our [Storybook guidelines](https://github.com/vtex/shoreline/issues/1455).
