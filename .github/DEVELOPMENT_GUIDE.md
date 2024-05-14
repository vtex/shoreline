# Development guide

- [Implement a component](#install-and-build-dependencies)
- [Write tests](#write-tests)
- [Write documentation](#write-documentation)
- [Commit convention](#commit-convention)
- [How does our CI/CD works?](#how-does-our-cicd-works)
- [Usefull commands](#usefull-commands)

## Implement a component

Before starting the development be sure to install and build the project dependencies.

```bash
pnpm i && pnpm build
```

1. Generate from template

We have a command that generates the component with all necessary files, after that you can start developing the component. To use it just run the following command.

```sh
pnpm gen:component
```

2. Run storybook

We use [Storybook](https://storybook.js.org/) as a playground to help in the development process of components in Shoreline. It's really helpful since you can see all changes applied in the story. To use it just run the following command.

```sh
pnpm dev:storybook
```

<!-- TODO: Maybe update the Storybook guidelines in case they move to a GH discussion or docs -->

Make sure that you read our [Storybook guidelines](https://github.com/vtex/shoreline/issues/1455) before you start developing components.

## Write tests

All Shoreline components are tested by default and we have three types of tests:

1. Visual tests using [Storybook visual tests](https://storybook.js.org/docs/writing-tests/visual-testing).
2. Interactive tests using [Storybook visual tests](https://storybook.js.org/docs/writing-stories/play-function/).
3. Unit tests using [Vitest](https://vitest.dev/)

### Where does all Storybook stories go?

<!-- TODO: Add link to our public Storybook URL here once we upgrade Chromatic -->

We use [Chromatic](https://www.chromatic.com/) to power our Storybook documentation.

Chromatic is also the tool responsible for run the visual regression tests, by comparing the stable stories with the new ones after a change is made. We need to make a responsible use of this tool, so we take snapshots of our components from a single story containing all possible variations of a component, instead of taking snapshots of every single story. This is a good practice that helps us keep our Storybook documentation lean and easy to navigate.

## Write documentation

We use [Nextra](https://nextra.site/) to write Shoreline documentation. The component documentation is written under the [packages/docs/pages/components](https://github.com/vtex/shoreline/tree/main/packages/docs/pages/components) folder and is generated partially automatically during the build process, you can check the [scripts](https://github.com/vtex/shoreline/tree/main/packages/docs/scripts) under the docs package to see how it works.

In order to make your component documentation available in the site you must follow some conventions.

### Props

1. Every new prop that aren't HTML native must be under the `[YourComponent]Options` interface.
2. Every property must have a JSDoc with a description.
3. Add the files that must have the documentation generated in the [props script](https://github.com/vtex/shoreline/blob/main/packages/docs/scripts/build-props.mjs#L10).

For example, in the button component we have something like that:

```ts
interface ButtonOptions {
  /**
   * Button contents
   */
  children: ReactNode;
  /**
   * Change between color combinations.
   * @default 'secondary'
   */
  variant: "primary" | "secondary" | "tertiary";
}
```

### Component

Every component must have a JSDoc with a description of what the component represents and an example of the usage.

For example, in the button component we have something like that:

```ts
/**
 * Buttons with labels represent the most important actions that users
 * frequently trigger. They can vary in prominence and can include an icon.
 * @status stable
 * @example
 * <Button>Action label</Button>
 */
export function Button() { ... }
```

### Examples

The examples are implemented under the [packages/docs/examples](https://github.com/vtex/shoreline/tree/main/packages/docs/examples) folder, you can create as many examples as necessary to your component.

### Documentation file

In this file is where you will get together the generated documentation with the written one in the examples, be sure to cover all the sections in the template below:

```md
# Component name

## Examples

## Required props

## Optional props

## Related components
```

In this example you can check how the button documentation looks like in the end:

```md
# Button

<!-- It shows the component description written in the component file -->
<ComponentDescription name="button" />
<!-- It shows the button.tsx example written in the examples folder -->
<Preview name="button" />

## Examples

### Variants

<!-- It shows the button-variants.tsx example written in the examples folder -->
<Preview name="button-variants" />

## Required props

<!-- It shows all the required props in the ButtonOptions interface -->
<PropsDocs name="button" required />

## Optional props

<!-- It shows all the optional props in the ButtonOptions interface -->
<PropsDocs name="button" />

## Related components

<ComponentSummaryGrid>
  <!-- It shows a link card reference to the Link component -->
  <ComponentSummary name="link" />
</ComponentSummaryGrid>
```

## Commit convention

We follow [semantic versioning](https://semver.org/) which means that we release patch versions for bug fixes, minor version for features and major for breaking changes.

Our release workflow is automated and to help us following best practices during development we use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) which adds a semantic pattern to commit messages representing the kind of change you are applying, whether is a bug, feature, breaking change or another type of change.

You can benefit of that by running the following command

```sh
pnpm commit
```

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

## Usefull commands

- `pnpm test` which runs all the tests in the repository.
- `pnpm test watch` to run tests in watch mode.
- `pnpm dev:docs` which runs the documentation site.
- `pnpm build:docs` which builds the docs package.
- `pnpm dev:storybook` which runs the storybook.
- `pnpm build:storybook` which builds the storybook package.
- `pnpm format` which runs prettier and formats the code.
- `pnpm lint` which runs the eslint and stylelint in the code.
- `pnpm commit` which runs the commit using the commit convention.
