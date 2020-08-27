# RFC admin/Collapsible

- Start Date: 2020-08-26
- PR: 🚧
- Issue: https://github.com/vtex/onda/issues/19

# Summary

A `Collapsible` is a container that allows toggling the display of content. It can be nested as well.

# Basic example

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

const collapsibleState = useCollapsible({ visible: true })

<Collapsible {...collapsibleState}>
  <Collapsible.Header label="Sample title">
    <Button>Action</Button>
    <Button>Action</Button>
  </Collapsible.Header>
  <Collapsible.Content>
    Content
  </Collapsible.Content>
</Collapsible>
```

# Detailed design

The Collapsible has two composites: `Header` and `Content`. It states are controlled by a custom hook, `useCollapsible`.

## Header

| prop     | type        | description             | required |
| -------- | ----------- | ----------------------- | -------- |
| label    | ReactNode   | title of the disclosure | 🚫       |
| children | ReactNode   | set of actions          | 🚫       |
| sx       | SxStyleProp | Theme-ui style prop     | 🚫       |

## Content

| prop     | type        | description           | required |
| -------- | ----------- | --------------------- | -------- |
| children | ReactNode   | what's beeing toggled | 🚫       |
| sx       | SxStyleProp | Theme-ui style prop   | 🚫       |

## useCollapsible

It is extracted directly from `reakit/disclosure` with the same props.
[Read more](https://reakit.io/docs/disclosure/#usedisclosurestate)

### Usage

```jsx
const props = useCollapsible({ visible: true })

<Collapsible {...props}>
  {/** Collapsible composites **/}
</Collapsible>
```

# Drawbacks

- The need to import props from the `useCollapsible()` hook every time that `Collapsible` is used, even if the state control is not necessary.

# Alternatives

We've considered the uncontrolled approach, in which the user would only react to the `Collapsible`'s internal changes.

```jsx
<Collapsible visible={/** Inital state **/} onCollapse={/** Do something **/} />
```

The problem with this approach is that the user would not be able to set the internal state of the component without a force update.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.
- We must write a migration guide for users coming from `@vtex/styleguide` since this is a breaking change for them.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Missing hover state.
- Missing disabled state.
