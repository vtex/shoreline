---
path: /feedback/toast/
---

# Toast

A toast is a variation of an alert that provides immediate feedback over actions that just happened and were caused by the user.

## Import

```jsx isStatic
import { useToaster } from '@vtex/admin-ui'
```

## Variations

### Info

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({
          type: 'info',
          message: 'Type here a longer message but not much longer than that',
        })
      }
    >
      Info toast
    </Button>
  )
}
```

### Success

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({ type: 'success', message: 'Type a short message here' })
      }
    >
      Success toast
    </Button>
  )
}
```

### Warning

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({
          type: 'warning',
          message: 'Type here a longer message but not much longer than that',
        })
      }
    >
      Warning toast
    </Button>
  )
}
```

### Error

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({ type: 'error', message: 'Type a short message here' })
      }
    >
      Error toast
    </Button>
  )
}
```

### Dismissible

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({
          message: 'Type here a longer message but not much longer than that',
          dismissible: true,
        })
      }
    >
      Dismissable
    </Button>
  )
}
```

### Action

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({
          type: 'success',
          message: 'Type a short message here',
          action: {
            children: <span>Action</span>,
            onClick: () => alert('Toast callback'),
          },
        })
      }
    >
      With action
    </Button>
  )
}
```

### Action + Dismissible

```jsx
function Example() {
  const toaster = useToaster()

  return (
    <Button
      onClick={() =>
        toaster.toast({
          type: 'warning',
          message: 'Type here a longer message but not much longer than that',
          dismissible: true,
          action: {
            children: <span>Action</span>,
            onClick: () => alert('Toast callback'),
          },
        })
      }
    >
      Dismissable, with action
    </Button>
  )
}
```

## toaster.toast props

| Name        | Type             | Description                                                  | Required | Default     |
| ----------- | ---------------- | ------------------------------------------------------------ | -------- | ----------- |
| message     | `string`         | Message displayed to the end-user.                           | ✅       | -           |
| type        | `ToastType`      | The toast's type.                                            | 🚫       | `info`      |
| duration    | `boolean`        | How long the toast should be apparent, in milliseconds.      | 🚫       | `false`     |
| dismissible | `boolean`        | Whether the toast can be dismissed or not.                   | 🚫       | `false`     |
| position    | `ToastPosition`  | The position which the toast should be rendered at.          | 🚫       | `bottom`    |
| action      | `ButtonProps`    | Toast's actions' props.                                      | 🚫       | `undefined` |
| iconProps   | `ToastIconProps` | Toast icon's props. Touchpoint to customize the toats' icon. | 🚫       | `undefined` |

## useToaster props

<blockquote palette="red">

The subframe prop is still unstable and not ready for production usage. Use it on your risk.

</blockquote>

| Name     | Type      | Description                                                                                                                                                                               | Required | Default |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| subframe | `boolean` | Whether the toaster should render its portal on the topmost window or not. Set this to true in case you're on an iframe scenario and you want to host your toaster on the topmost window. | 🚫       | `false` |

## Limitations

- Destructuring the toaster will make the toast method unavailable, once the toast method binding is asynchronous, and destructuring will dereference the unbound method.
- Toasts can only be rendered on the client-side.
