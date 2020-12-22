# Brand UI Toast

A `Toast` is a small informational message that pops up on the screen like a "toast".

# Design

The `ToastProvider` will provide the **Toast Context** for `useToast` hook. This hook can receive some params:

| param     | type      | description                 | required | default |
| --------- | --------- | --------------------------- | -------- | -------- |
| actionText | string | the text of the toast action | 🚫       | - |
| onActionClick | function | the function that handles the action click | 🚫       | - |
| closeOnAction | boolean | determines whether close the toast on action click or not | 🚫       | false |

This hook will return:

- `addToast`: function for adding a toast.
- `hideToast`: function for hiding a toast.

# Simple usage

```jsx
import { ToastProvider, useToast } from '@vtex/brand-ui'

const { addToast } = useToast({
  actionText: 'Undo',
  onActionClick: () => console.log('Action clicked'),
  closeOnAction: true,
})

const handleClick = () => {
  addToast('New toast')
}

<ToastProvider>
  <Button onClick={handleClick}>Show toast</Button>
</ToastProvider>
```
