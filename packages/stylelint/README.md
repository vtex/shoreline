# Shoreline Stylelint

A configuration of [Stylelint](https://stylelint.io/) rules to help with the Shoreline adoption.

- [How to run?](#how-to-run)
- [Development](#development)
  - [Add new rules](#add-new-rules)
  - [Build custom rules](#build-custom-rules)
  - [Setup new rule/plugin](#setup-new-rule-or-plugin)
- [Rules](#rules)
  - [no-px-values](#no-px-values)
  - [no-text-property](#no-text-property)

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

## Development

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

### Setup new rule or plugin

You must set the new rule or plugin on [the Stylelint configuration file](./src/index.js)

## Rules

### no-px-values

This rule prevents your CSS properties from having a `px` value defined.

```css
/* Don't 🚫 */
margin: 4px;
padding-bottom: 8px;
padding-top: 8px;
height: 24px;

/* Do ✅ */
margin: 0.25rem;
padding-bottom: 0.5rem;
padding-top: 0.5rem;
height: 1.5rem;
```

Using the `--fix` command will convert the `px` values to `rem`.

### no-text-property

```css
/* Don't 🚫 */
text: var(--sl-text-caption-2);

/* Do ✅ */
font: var(--sl-text-caption-2-font);
letter-spacing: var(--sl-text-caption-2-letter-spacing);
```

Using the `--fix` command will split the `text` property into `font` and `letter-spacing`.
