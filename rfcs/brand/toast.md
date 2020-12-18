# RFC Brand Toast

Inspiration: https://github.com/reactjs/rfcs/blob/master/README.md

- Start Date: 2020-12-16

# Summary

A `Toast` is a small informational message that pops up on the screen like a "toast".

# Basic example [optional]

```jsx
import { ToastProvider, useToast } from '@vtex/brand-ui'

const { addToast } = useToast({
  actionText: 'Thanks',
  onActionClick: () => console.log('Action clicked'),
  closeOnAction: false,
})

const handleClick = () => {
  addToast('New toast')
}

<ToastProvider>
  <Button onClick={handleClick}>Show toast</Button>
</ToastProvider>
```

# Detailed design

The `ToastProvider` will provide the **Toast Context** for `useToast` hook. This hook can receive some params:

| param     | type      | description                 | required | default |
| --------- | --------- | --------------------------- | -------- | -------- |
| alignment | AlignOptions | where the toast must be positioned on screen | 🚫       | `bottom-left` |
| actionText | string | the text of the toast action | 🚫       | - |
| onActionClick | function | the function that handles the action click | 🚫       | - |
| closeOnAction | boolean | determines whether close the toast on action click or not | 🚫       | false |

**AlignOptions** possible values: `top`, `center`, `bottom`, `top-left`, `center-left`, `bottom-left`, `top-center`, `bottom-center`, `top-right`, `center-right` and `bottom-right`.

This hook will return:

- `addToast`: function for adding a toast.
- `hideToast`: function for hiding a toast.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- Document the components with its user cases, besides usage examples with all Toast's features (hooks, context and its providers).
