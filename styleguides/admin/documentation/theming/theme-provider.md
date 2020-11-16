---
path: /theming/theme-provider/
---

# ThemeProvider

Provides context so we can consume our theme along with our design system. This provider wraps [Emotion's ThemeProvider](https://emotion.sh/docs/emotion-theming#themeprovider-reactcomponenttype) with `@vtex/admin-ui-theme`. Since all of our components are theme-aware, remember that every application should have a `<ThemeProvider>` defined in the project root.

Example

```jsx static
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```
