# 🌊 Onda

> VTEX Admin Design System

## Development

### Bootstrap packages

Use the following commands to bootstrap all the packages.

```bash
yarn && yarn build
```

### Storybook

Running `admin-ui`

```bash
yarn storybook:admin
```

### Publishing

To publish a stable version:

```bash
yarn publish:packages
```

or

```bash
yarn publish:experimental
```

To publish a experimental version

### Commit Messages

We use [`commitlint`](https://commitlint.js.org/#/) and [`commitizen`](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/). Please take the time to understand semantic versioning before committing.