---
path: /toast/
---

# Toast

A toast is a variation of an alert that provides immediate feedback over actions that just happened and were caused by the user.

## Behavior

The way of rendering a Toast on `admin-ui` is by calling the function returned by the `useToast` hook.

<blockquote palette="blue">

Make sure to call the `useToast` hook one component level below the `<ToastProvider>`. This is necessary in order to the Toast work.

</blockquote>

```jsx
function Example() {
  const showToast = useToast()

  return (
    <Button
      onClick={() =>
        showToast({
          message: 'This is the admin-ui toast!',
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

## Import

```jsx isStatic
import { ToastProvider, useToast } from '@vtex/admin-ui'
```

## Variations

### Type

```jsx
function Example() {
  const showToast = useToast()

  return (
    <tag.div csx={{ '> *:not(:last-child)': { marginRight: '0.5rem' } }}>
      <Button
        onClick={() =>
          showToast({
            message: 'Type here a longer message but not much longer than that',
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
            message: 'Type here a longer message but not much longer than that',
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
```

### Dismissible

```jsx
function Example() {
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
```

### Action

```jsx
function Example() {
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
```

### Action + Dismissible

```jsx
function Example() {
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
