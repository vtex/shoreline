---
path: /feedback/toast/
---

# Toast

The toast is a variation of an alert that provides immediate feedback over actions that just happened, and were caused by the user. It displays a message that goes away after a set period of time.

## Import

```jsx isStatic
import { useToaster } from '@vtex/admin-ui'
```

## Behavior

```jsx isStatic
function Example() {
  const toaster = useToaster()

  return (
    <Button onClick={() => toaster.toast({ message: 'Hello world' })}>
      Display toast
    </Button>
  )
}
```

## Variations

### Type

```jsx
function Example() {
  const toaster = useToaster()

  const message = 'Hello world'

  return (
    <Set orientation="vertical" spacing={3}>
      <Set>
        <Button onClick={() => toaster.toast({ type: 'info', message })}>
          Info toast
        </Button>
        <Button onClick={() => toaster.toast({ type: 'success', message })}>
          Success toast
        </Button>
        <Button onClick={() => toaster.toast({ type: 'warning', message })}>
          Warning toast
        </Button>
        <Button onClick={() => toaster.toast({ type: 'error', message })}>
          Error toast
        </Button>
      </Set>
      <Set>
        <Button
          onClick={() =>
            toaster.toast({
              message,
              dismissible: true,
            })
          }
        >
          Dismissable
        </Button>
        <Button
          onClick={() =>
            toaster.toast({
              type: 'success',
              message,
              action: {
                children: <span>Action</span>,
                onClick: () => alert('Toast callback'),
              },
            })
          }
        >
          With action
        </Button>
        <Button
          onClick={() =>
            toaster.toast({
              type: 'warning',
              message,
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
        <Button
          onClick={() =>
            toaster.toast({
              message:
                'Type here a longer message but not much longer than that',
              dismissible: true,
              action: {
                children: <span>Action</span>,
                onClick: () => alert('Toast callback'),
              },
            })
          }
        >
          With long message
        </Button>
      </Set>
    </Set>
  )
}
```

## toast props

| Name        | Type             | Description                                                  | Required | Default     |
| ----------- | ---------------- | ------------------------------------------------------------ | -------- | ----------- |
| message     | `string`         | Message displayed to the end user.                           | ✅       | -           |
| type        | `ToastType`      | The toast's type.                                            | 🚫       | `info`      |
| duration    | `boolean`        | How long the toast should be apparent, in milliseconds.      | 🚫       | `false`     |
| dismissible | `boolean`        | Whether the toast can be dismissed or not.                   | 🚫       | `false`     |
| position    | `ToastPosition`  | The position which the toast should be rendered at.          | 🚫       | `bottom`    |
| action      | `ButtonProps`    | Toast's actions' props.                                      | 🚫       | `undefined` |
| iconProps   | `ToastIconProps` | Toast icon's props. Touchpoint to customize the toats' icon. | 🚫       | `undefined` |

## useToaster props

<blockquote palette="red">

The `subframe` prop is still unstable and not ready for production usage. Use it on your risk.

</blockquote>

| Name     | Type      | Description                                                                                                                                                                               | Required | Default |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| subframe | `boolean` | Whether the toaster should render its portal on the topmost window or not. Set this to true in case you're on an iframe scenario and you want to host your toaster on the topmost window. | 🚫       | `false` |

## Limitations

Toasts can only be rendered on the client side.
