---
title: Alert
path: /alert/
---

# Alert

Alerts are notifications of mild to high priority. They may inform the user about events they should know, or explain a problem and point out a solution. They may be triggered by a user action or not.

## Usage

```jsx isStatic
import { Alert } from '@vtex/admin-ui'

function Example() {
  return <Alert visible>Order successfully placed</Alert>
}
```

## Examples

### Tone of voice

The alert's [tone of voice](/foundations/colors/#tones) is either `info` (default), `warning`, `possitive`, or `critical`.

```jsx
function Example() {
  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert visible tone="info">
        Info Alert
      </Alert>
      <Alert visible tone="warning">
        Warning Alert
      </Alert>
      <Alert visible tone="positive">
        Positive Alert
      </Alert>
      <Alert visible tone="critical">
        Critical Alert
      </Alert>
    </Set>
  )
}
```

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

### Action

You can easily add an action into any `Alert` using the `Anchor` component.

```jsx
function Example() {
  const handlePrimaryAction = () => window.alert('primary action!')
  const handleSecondaryAction = () => window.alert('secondary action!')
  const handleTertiaryAction = () => window.alert('tertiary action!')

  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Alert tone="positive" icon={<IconCheckCircle />} visible>
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

Represents whether the height is fluid or not on mobile devices. By default its value is `true`. You can change it setting the `fluid` property to be either `true` or `false`.

```jsx
function Example() {
  return (
    <Box csx={{ width: 300 }}>
      <Alert visible fluid={false} tone="positive" onDismiss={() => {}}>
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
    <Alert visible sticky tone="positive" onDismiss={() => {}}>
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
      <Alert tone="info" icon={<IconQuestion />} visible>
        Info Alert
      </Alert>
      <Alert tone="positive" icon={<IconCheckCircle />} visible>
        Positive Alert
      </Alert>
      <Alert tone="warning" icon={<IconWarning />} visible>
        Warning Alert
      </Alert>
      <Alert tone="critical" icon={<IconXOctagon />} visible>
        Critical Alert
      </Alert>
    </Set>
  )
}
```

## Props

| Name      | Type                                   | Description                                   | Required | Default |
| --------- | -------------------------------------- | --------------------------------------------- | -------- | ------- |
| csx       | `StyleObject`                          | Custom styles                                 | 🚫       | `{}`    |
| icon      | `ReactNode`                            | Icon to display                               | 🚫       | -       |
| onDismiss | `() => void`                           | Action to dispatch on dismiss                 | 🚫       | -       |
| visible   | `boolean`                              | Whether it's visible or not                   | 🚫       | `false` |
| tone      | `info, positive, warning, or critical` | Tone of voice                                 | 🚫       | `info`  |
| children  | `ReactNode`                            | Component children                            | 🚫       | -       |
| sticky    | `boolean`                              | Whether it's sticky or not                    | 🚫       | `false` |
| fluid     | `boolean`                              | Whether the height is fluid on mobile devices | 🚫       | `true`  |
