# RFC Admin/Separator

- Start Date: 2020-08-27
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

The Separator is a static structure that provides a visible boundary for elements.

# Basic example

- If the proposal involves a new or changed API, include a basic code example.

```jsx
import { Separator } from '@vtex/admin-ui'

<Separator />
<Separator orientation="vertical"/>
<Separator orientation="horizontal"/>
```

# Detailed design

## Props

| prop        | type                     | description             | required | default      |
| ----------- | ------------------------ | ----------------------- | -------- | ------------ |
| orientation | "horizontal", "vertical" | Separator's orientation | 🚫       | "horizontal" |
| sx          | SxStyleProp              | Theme-ui style prop     | 🚫       | -            |

This is the bulk of the RFC, you must:

## Sx

Even the `Separator` being a component that doesn't need style in the most use cases, with the `sx` prop it will be possible to do this, if necessary.

# Drawbacks

Why should we _not_ do this? Please consider:

- implementation cost, both in term of code size and complexity
- the impact on teaching people
- integration of this feature with other existing and planned features
- cost of migrating existing applications (is it a breaking change?)

💡There are tradeoffs to choosing any path. Attempt to identify them here.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.
- It will have the same props as the [VTEX styleguide](https://styleguide.vtex.com/)
- `Divider` -> `Separator`

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Should we create already as a Base component?
