# Shoreline CSS

The theme files are generated programmatically using the `@vtex/shoreline-css` package.

## Declaring tokens

You can declare the `@theme` at-rule to declare the theme:

```css
@theme <theme-name> {
  /* css rule */
}
```

For example:

```css filename="tokens.css"
@theme sunrise {
  :where(html) {
    --space-1: 1rem;
    --space-2: 2rem;
    --bg-base: #fff;
  }
}
```

You don't need to prefix the variables, this will be done afterwards.

## Transforming tokens

Use the `tokens` function to transform tokens.

```ts
import { tokens } from '@vtex/shoreline-css'

tokens({
  inputFile: 'src/tokens.css',
  outdir: 'dist',
  emitFile: true,
  useCascadeLayers: true,
  browserslistQuery: 'last 2 versions'
})
```

This code generates the `tokens.css` file in the `outdir` folder.

```css filename="dist/tokens.css"
@layer sl-tokens {
  :where(html) {
    --sl-space-1: 1rem;
    --sl-space-2: 2rem;
    --sl-bg-base: #fff;
  }
}
```

## Bundling

The `bundle` function [bundles](https://lightningcss.dev/bundling.html) existing css code with the tokens.

```ts
import { bundle } from '@vtex/shoreline-css'

bundle({
  inputFile: 'src/styles.css',
  tokensFile: 'src/tokens.css'
  outdir: 'dist',
  useCascadeLayers: true,
  browserslistQuery: 'last 2 versions'
})
```
