# Enforce that design tokens usage are being used in the correct way (`@vtex/admin-ui/design-tokens-usage`)

Examples of **incorrect** code for this rule:

```js
<Box csx={{ bg: '$bg.secondary' }} />
```

Examples of **correct** code for this rule:

```js
<Box csx={{ bg: '$secondary' }} />
```
