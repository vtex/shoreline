# Shoreline CSS

The `@vtex/shoreline-css` package transforms a `shoreline.config.(js | ts)` into css. For example, the config:

```ts
//shoreline.config.ts

import { defineConfig } from '@vtex/shoreline-css'

const config = defineConfig({
  outdir: './shoreline',
  cwd: process.cwd(),
  tokens: {
    space: {
      1: '1rem',
      2: '2rem',
      3: '3rem',
      gap: '$space-1',
    },
  },
})
```

Generates both: styles.css and tokens.ts

```css
/* shoreline/styles.css */

@layer sl-tokens {
  :root {
    --sl-space-1: 1rem;
    --sl-space-2: 2rem;
    --sl-space-3: 3rem;
    --sl-space-gap: var(--sl-space-1);
  }
}
```

```ts
//shoreline/tokens.ts

export const ShorelineTokens = {
  Space1: 'var(--sl-space-1)',
  Space3: 'var(--sl-space-2)',
  Space3: 'var(--sl-space-3)',
  SpaceGap: 'var(--sl-space-gap)',
}
```
