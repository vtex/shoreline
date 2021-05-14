---
path: /feedback/toast/
---

# Toast

A toast is a variation of an alert that provides immediate feedback over actions that just happened and were caused by the user.

## Import

```jsx isStatic
import { toast } from '@vtex/admin-ui'
```

## Variations

### Info

```jsx
function Example() {
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
          type: 'success',
          message: 'Type a short message here',
        })
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({ type: 'error', message: 'Type a short message here' })
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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
  return (
    <Button
      onClick={() =>
        toast.dispatch({
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

## toast.dispatch props

| Name        | Type             | Description                                                  | Required | Default        |
| ----------- | ---------------- | ------------------------------------------------------------ | -------- | -------------- |
| message     | `ReactNode`      | Message displayed to the end-user.                           | ✅       | -              |
| type        | `ToastType`      | The toast's type.                                            | 🚫       | `info`         |
| duration    | `boolean`        | How long the toast should be apparent, in milliseconds.      | 🚫       | `false`        |
| dismissible | `boolean`        | Whether the toast can be dismissed or not.                   | 🚫       | `false`        |
| position    | `ToastPosition`  | The position which the toast should be rendered at.          | 🚫       | `bottom-right` |
| action      | `ButtonProps`    | Toast's actions' props.                                      | 🚫       | `undefined`    |
| iconProps   | `ToastIconProps` | Toast icon's props. Touchpoint to customize the toats' icon. | 🚫       | `undefined`    |

## Limitations

- Toasts can only be rendered on the client-side.
