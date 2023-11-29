# Shoreline Stylelint

A configuration of [Stylelint]() rules to help with the Shoreline adoption.

## How to run?

All files:

```bash
pnpm stylelint **/*.css
```

Specific file:

```bash
pnpm run stylelint src/example.css
```

Fix:

```bash
pnpm stylelint **/*.css --fix
```

### Development

### Add new rules

1. Refer to the [Writing rules](https://stylelint.io/developer-guide/rules) guide of the Stylelint documentation

### Build custom rules

1. Refer to the [Writing plugins](https://stylelint.io/developer-guide/plugins) guide of the Stylelint documentation
2. Create your rule in the `/src/plugins` directory
3. Validate your plugin with tests (reference sibling plugins for examples)

Useful references:

1. [PostCSS API](https://postcss.org/api/): It is useful when writing a new plugin.
2. [jest-preset-stylelint](https://github.com/stylelint/jest-preset-stylelint#usage): Use this documentation when writing tests.
3. [stylelint-prettier](https://github.com/prettier/stylelint-prettier)

### Setup new rule/plugin

You must setup the new rule or plugin on [the Stylelint configuration file](./src/index.js)
