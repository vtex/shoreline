# Brand UI HelloBar

`Hellobar` is a section where you can present a specific message to your visitors, without distracting them from your regular content.

# Design

## Props

| prop     | type                                 | description                        | required | default   |
| -------- | ------------------------------------ | ---------------------------------- | -------- | --------- |
| variant  | `primary`, `secondary` or `tertiary` | palette variation of the hello bar | 🚫       | `primary` |
| children | ReactNode                            | message shown inside the hello bar | 🚫       | -         |
| action   | { label: string, onClick: Function } | the action of the hello bar        | 🚫       | -         |
| sx       | SxStyleProp                          | Theme-ui style prop                | 🚫       | -         |

# Usage

## Simple Usage

```jsx
import { HelloBar } from '@vtex/brand-ui'

const Example = () => <HelloBar>Hello Bar text here.</HelloBar>
```

## With Icon

```jsx
import { HelloBar } from '@vtex/brand-ui'

const Example = () => (
  <HelloBar icon={(props) => <Icon {...props} />}>
    Hello Bar text here.
  </HelloBar>
)
```
