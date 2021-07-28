---
path: /theming/theme-provider/
---

# ThemeProvider

Provides context so we can consume our theme along with our design system. This provider creates a [Emotion's Instance](https://emotion.sh/docs/@emotion/css#custom-instances) with `@vtex/admin-core`, so every style within this provider will consume from a single and unique instance. Since all of our components are theme-aware, remember that every application should have a `<ThemeProvider>` defined in the project root.

## createSystem

To avoid conflict between several `ThemeProviders`, we need to guarantee that each application will consume our theme from a unique emotion instance, to do this we provide to you the `createSystem` function. This function is responsible for creating an instance from our admin system, along with all its features and the unique emotion instance.

## Usage Example

> Remember that the `createSystem` call should be outside of the react render.

```jsx isStatic
import { ThemeProvider } from '@vtex/admin-ui'

const system = createSystem(/**Project App key*/)

function ProjectRoot() {
  return <ThemeProvider system={system}>{/** Your app here */}</ThemeProvider>
}
```
