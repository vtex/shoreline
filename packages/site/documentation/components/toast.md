---
path: /toast/
---

# Toast

A toast is a variation of an alert that provides immediate feedback over actions that just happened and were caused by the user.

## Import

```jsx isStatic
import { ToastProvider, useToast } from '@vtex/admin-ui'
```

## Variations

### Type

```jsx
function Example() {
  const ToastVariants = () => {
    const showToast = useToast()

    return (
      <tag.div csx={{ '> *:not(:last-child)': { marginRight: '0.5rem' } }}>
        <Button
          onClick={() =>
            showToast({
              message:
                'Type here a longer message but not much longer than that',
            })
          }
        >
          Info toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              type: 'success',
              message: 'Type a short message here',
            })
          }
        >
          Success toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              type: 'warning',
              message:
                'Type here a longer message but not much longer than that',
            })
          }
        >
          Warning toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              type: 'error',
              message: 'Type a short message here',
            })
          }
        >
          Error toast
        </Button>
      </tag.div>
    )
  }

  return (
    <ToastProvider>
      <ToastVariants />
    </ToastProvider>
  )
}
```

### Dismissible

```jsx
function Example() {
  const Toast = () => {
    const showToast = useToast()

    return (
      <Button
        onClick={() =>
          showToast({
            message: 'Type here a longer message but not much longer than that',
            dismissible: true,
          })
        }
      >
        Dismissable
      </Button>
    )
  }

  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  )
}
```

### Action

```jsx
function Example() {
  const Toast = () => {
    const showToast = useToast()

    return (
      <Button
        onClick={() =>
          showToast({
            type: 'success',
            message: 'Type a short message here',
            action: {
              label: 'Action',
              onClick: () => alert('Toast callback'),
            },
          })
        }
      >
        With action
      </Button>
    )
  }

  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  )
}
```

### Action + Dismissible

```jsx
function Example() {
  const Toast = () => {
    const showToast = useToast()

    return (
      <Button
        onClick={() =>
          showToast({
            type: 'warning',
            message: 'Type here a longer message but not much longer than that',
            dismissible: true,
            action: {
              label: 'Action',
              onClick: () => alert('Toast callback'),
            },
          })
        }
      >
        Dismissable, with action
      </Button>
    )
  }

  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  )
}
```

## showToast props

| Name        | Type                                     | Description                                             | Required | Default     |
| ----------- | ---------------------------------------- | ------------------------------------------------------- | -------- | ----------- | ----------------- | --- | ------ |
| message     | `ReactNode`                              | Message displayed to the end-user.                      | ✅       | -           |
| type        | `error                                   | info                                                    | warning  | success`    | The toast's type. | 🚫  | `info` |
| duration    | `number`                                 | How long the toast should be apparent, in milliseconds. | 🚫       | `10000`     |
| dismissible | `boolean`                                | Whether the toast can be dismissed or not.              | 🚫       | `false`     |
| action      | `{ label: string, onClick: () => void }` | Toast's actions' props.                                 | 🚫       | `undefined` |
| key         | `string`                                 | Toast's key.                                            | 🚫       | `undefined` |
