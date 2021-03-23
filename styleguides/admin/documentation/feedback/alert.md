---
path: /feedback/alert/
---

# Alert

Alerts are notifications of mild to high priority. They may inform the user about events they should know, or explain a problem and point out a solution. They may be triggered by a user action or not.

## Import

```jsx isStatic
import { Alert } from '@vtex/admin-ui'
```

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

There are four types of alerts: `info`, `warning`, `success`, and `error`. By default, it will render an Alert with `type` property set to `warning`.

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

### Action

You can easily add an action into any `Alert` using the `Anchor` component.

```jsx
function Example() {
  const handlePrimaryAction = () => window.alert('primary action!')
  const handleSecondaryAction = () => window.alert('secondary action!')
  const handleTertiaryAction = () => window.alert('tertiary action!')

  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert type="success" icon={<IconSuccessColorful />} visible>
        Order successfully placed <Anchor>See order.</Anchor>
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

Represents whether the height is fluid or not. This is a [Responsive Value Property](/theming/responsive-design/#responsive-values) and by default it has the following value: `[true, true, false]`. You can change it setting the `fluid` property to be either `true`, `false` or a `ResponsiveValue`.

```jsx
function Example() {
  return (
    <Box csx={{ width: 300 }}>
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

### With Icon

You can add an icon on the left side of the `Alert`. Just use the `icon` property.

```jsx
function Example() {
  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert type="info" icon={<IconHelp />} visible>
        Info Alert
      </Alert>
      <Alert type="success" icon={<IconSuccessColorful />} visible>
        Success Alert
      </Alert>
      <Alert type="warning" icon={<IconWarningColorful />} visible>
        Warning Alert
      </Alert>
      <Alert type="error" icon={<IconErrorColorful />} visible>
        Error Alert
      </Alert>
    </Set>
  )
}
```

## Props

| Name      | Type                  | Description                   | Required  | Default             |
| --------- | --------------------- | ----------------------------- | --------- | ------------------- | --------------- | --- | ------- |
| csx       | `StyleObject`         | Custom styles                 | 🚫        | {}                  |
| icon      | `ReactNode`           | Icon to display               | 🚫        | -                   |
| onDismiss | `() => void`          | Action to dispatch on dismiss | 🚫        | -                   |
| visible   | `boolean`             | Whether it's visible or not   | 🚫        | false               |
| type      | `'error'              | 'success'                     | 'warning' | 'info'`             | Icon to display | 🚫  | warning |
| children  | `ReactNode`           | Component children            | 🚫        | -                   |
| sticky    | `boolean`             | Whether it's sticky or not    | 🚫        | false               |
| fluid     | `Responsive<boolean>` | Whether the height is fluid   | 🚫        | [true, true, false] |
