# shoreline/no-text-property

Disallows use of `px` values.

```diff

// Do
+ font: var(--sl-text-body-font);
+ letter-spacing: var(--sl-text-body-letter-spacing);
// Don't
- text: var(--sl-text-body);
```

## How to configure?

```js
const stylelintConfig = {
  rules: {
    'shoreline/no-text-property': true,
  },
}
```

## How to run?

All files:

```bash
pnpm stylelint **/*.css
```

Specific file:

```bash
pnpm run stylelint src/example.css
```

## Fix

```bash
pnpm stylelint **/*.css --fix
```

```diff
- text: var(--sl-text-body);
+ font: var(--sl-text-body-font);
+ letter-spacing: var(--sl-text-body-letter-spacing);
```

## Output

```bash
 10:5  ✖  Expected "text" property to be splited in "font" and "letter-spacing"  shoreline/no-text-property
```
