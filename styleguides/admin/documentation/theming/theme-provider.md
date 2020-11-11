---
path: /theming/theme-provider/
---

# ThemeProvider

Provides a context so we can consume our theme along with our design system.

The `<ThemeProvider>` component accepts the theme as a prop, where you can specify overrides to the default theme. Since all of our components are theme aware, remember that every application should have a `<ThemeProvider>` defined in the project root.

```jsx static
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```
