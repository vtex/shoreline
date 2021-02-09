# RFC Brand Skeleton

- 📅 Start Date: 2021-02-09
- 🏆 Champions: @jardelymaris

# Summary

- `Skeleton` is an initial loading component that displays elements similarly to the actual content.

# Basic example [optional]

```jsx
import { Skeleton } from '@vtex/brand-ui'

<Skeleton shape='circle' sx={{ width: 100, height: 100 }}/>
<Skeleton shape='rect' sx={{ width: 100, height: 100 }}/>
```

# Detailed design

- Skeleton is a simple component that has animation and shapes.

| param     | type      | description                 | required | default |
| --------- | --------- | --------------------------- | -------- | -------- |
| shape | SkeletonShape | shape of the skeleton | 🚫       | `rect` |
| el | ElementType | element type | 🚫       | `div` |
| sx | SxStyleProp | aditional styles | 🚫       | - |

The `SkeletonShape` type is specified below:

```jsx
type SkeletonShape = 'rect' | 'circle'
```

# Drawbacks

- At the moment, none noted. 

# Adoption strategy [optional]

- This is a new feature, no breaking changes to any packages in `onda`.

# Education [optional]

- Document the components with its user cases.

