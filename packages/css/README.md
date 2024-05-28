# Shoreline CSS

The `@vtex/shoreline-css` package transforms shoreline tokens into css. For
example, theme:

```css
@theme example {
  --space-1: 1rem;
  --space-2: 2rem;
  --space-3: 3rem;
  --space-gap: var(--space-1);
}
```

will convert to:

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
