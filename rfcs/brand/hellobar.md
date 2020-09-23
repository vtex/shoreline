# RFC Brand Hello Bar

- 📅 Start Date: 2020-09-16
- 🏆 Champion: @lucasmedeiros

# Summary

`Hellobar` is a section where you can present a specific message to your visitors, without distracting them from your regular content.

# Basic example

```jsx
import { HelloBar } from '@vtex/brand-ui'

;<HelloBar>Hello Bar text here.</HelloBar>
```

# Detailed design

## HelloBar

| prop   | type                                 | description                 | required | default |
| ------ | ------------------------------------ | --------------------------- | -------- | ------- |
| action | { label: string, onClick: Function } | the action of the hello bar | 🚫       | -       |

# Adoption strategy

- It causes no breaking change since it is a new component.

# Education

- Document the components with its user cases, besides usage examples with all Hello Bar's features.
