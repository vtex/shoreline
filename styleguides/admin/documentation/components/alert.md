---
path: /alert/
---

# Alert

Configuration device, where users can input text and choose between anticipated options. Forms include many elements that will be described individually.

## Behavior

```jsx
function Example() {
  return (
    <Alert
      visible
      type="success"
      onDismiss={() => window.alert('Alert dismissed!')}
    >
      Order successfully placed
    </Alert>
  )
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Alert } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variations

### Visible

The Alert can be visible or not. By default, it will render an Alert with the `visible` property set to `false`.

```jsx
function Example() {
  const [visible, setVisible] = React.useState(false)

  const handleDismiss = () => setVisible(false)
  const handleToggle = () => setVisible((v) => !v)

  return (
    <Box>
      <Button onClick={handleToggle}>Toggle</Button>
      <Alert visible={visible} onDismiss={handleDismiss}>
        This account is inactive. Check your billing for more information.
      </Alert>
    </Box>
  )
}
```

### Types

There are four types of alert: `info`, `warning`, `success`, and `error`. By default, it will render an Alert with `type` property set to `warning`.

```jsx
function Example() {
  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert visible type="info">
        Info Alert
      </Alert>
      <Alert visible type="warning">
        Warning Alert
      </Alert>
      <Alert visible type="success">
        Success Alert
      </Alert>
      <Alert visible type="error">
        Error Alert
      </Alert>
    </Set>
  )
}
```

### Actions

The alert can have action buttons that handle the interactions with the component. There are three main actions: `primary`, `secondary`, and `tertiary`.

```jsx
function Example() {
  const handlePrimaryAction = () => window.alert('primary action!')
  const handleSecondaryAction = () => window.alert('secondary action!')
  const handleTertiaryAction = () => window.alert('tertiary action!')

  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert
        visible
        actions={{
          primary: { label: 'Primary Action', onClick: handlePrimaryAction },
          secondary: {
            label: 'Secondary Action',
            onClick: handleSecondaryAction,
          },
          tertiary: {
            label: 'Tertiary Action',
            onClick: handleTertiaryAction,
          },
        }}
      >
        Alert with Actions
      </Alert>
    </Set>
  )
}
```

### onDismiss

Represents the event of click from the alert dismiss button. To use this feature, define the `onDismiss` property.

```jsx
function Example() {
  const [visible, setVisible] = React.useState(true)
  return (
    <Alert
      visible={visible}
      onDismiss={() => {
        window.alert('dismissed!')
        setVisible(false)
      }}
    >
      This account is inactive. Check your billing for more information.
    </Alert>
  )
}
```

### Fluid

The Alert can have a fluid height. By default, it will render with a static one, but you can change it setting the `fluid` property to `true`.

```jsx
function Example() {
  return (
    <Box styles={{ width: 343, height: 72 }}>
      <Alert visible fluid type="success" onDismiss={() => {}}>
        This account is inactive. Check your billing for more information.
      </Alert>
    </Box>
  )
}
```

### Sticky

The Alert can have a sticky border or not. By default, it will render an Alert with the `sticky` property set to `false`.

```jsx
function Example() {
  return (
    <Alert visible sticky type="success" onDismiss={() => {}}>
      Order successfully placed
    </Alert>
  )
}
```

## Props

<propdetails heading="Alert" component="Alert"></propdetails>
