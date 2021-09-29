---
path: /toast/
---

# Toast

The toast is used to show alerts on top of an overlay. The toast will close itself when the dismiss button is clicked, or after a timeout. The toast component is used to give feedback to users after an action has taken place.

## Usage

```jsx isStatic
import { ToastProvider, useToast, createSystem } from '@vtex/admin-ui'

const [SystemProvider] = createSystem({ key: 'app-name' })

// You must always add the ToastProvider in the root of your application
function Root() {
  return (
    <SystemProvider>
      <ToastProvider>
        {...}
      </ToastProvider>
    </SystemProvider>
  )
}

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

## Examples

<blockquote palette="blue">

Make sure to call the `useToast` hook one component level below the `<ToastProvider>`. This is necessary in order for the Toast work.

</blockquote>

### Type

It represents the toast appearance and is used to convey its feedback.

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
        Info toast (default)
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

Display a button to allow dismissing the toast when clicked.

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

Display a button allowing the toast to have an action.

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

## Props

Because the way of rendering a Toast on admin-ui is by calling the function returned by the `useToast` hook, these are the properties that you can pass to the function returned params.

| Name        | Type                                     | Description                                             | Required | Default     |
| ----------- | ---------------------------------------- | ------------------------------------------------------- | -------- | ----------- | ----------------- | --- | ------ |
| message     | `ReactNode`                              | Message displayed to the end-user.                      | ✅       | -           |
| type        | `error                                   | info                                                    | warning  | success`    | The toast's type. | 🚫  | `info` |
| duration    | `number`                                 | How long the toast should be apparent, in milliseconds. | 🚫       | `10000`     |
| dismissible | `boolean`                                | Whether the toast can be dismissed or not.              | 🚫       | `false`     |
| action      | `{ label: string, onClick: () => void }` | Toast's actions' props.                                 | 🚫       | `undefined` |
| key         | `string`                                 | Toast's key.                                            | 🚫       | `undefined` |
