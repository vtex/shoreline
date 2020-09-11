# RFC VTEX Icons

- 📅 Start Date: 2020-09-11
- 🏆 Champions: @vitoria

# Summary

`@vtex/icons` is an internal package of `onda` containing icons that can be used by any styleguide.

# Basic example

```jsx
import { IconCaret } from '@vtex/icons'

const MyIcon = () => <IconCaret />
```

# Detailed design

## Folder structure

```
onda
- components
- icons
--- src/
----- IconCaret.tsx
----- IconClose.tsx
----- index.ts
----- package.json
- styleguides
```


# Adoption strategy

1. You must add the `@vtex/icons` in your styleguide dependencies.
2. If you have icon components in your styleguide and they are common between another styleguide, pass it the `@vtex/icons` package and changes the imports.

# Education

It must have documentation.
