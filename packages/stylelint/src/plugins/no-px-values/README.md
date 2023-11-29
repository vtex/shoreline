# shoreline/no-px-values

Disallows use of `px` values.

```diff

// Do
+ padding: 1rem;
+ margin: 1rem 0.5rem;
// Don't
- padding: 16px;
- margin: 16px 8px;
```

## How to configure?

```js
const stylelintConfig = {
  rules: {
    'shoreline/no-px-values': true,
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
- margin: 16px 8px;
+ margin: 1rem 0.5rem;
```

## Output

```bash
 10:5  ✖  Expected "padding: 16px" to be "padding: 1rem".             shoreline/no-px-values
 11:5  ✖  Expected "margin: 8px 4px" to be "margin: 0.5rem 0.25rem".  shoreline/no-px-values
```
