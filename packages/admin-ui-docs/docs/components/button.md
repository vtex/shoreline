---
title: Button
path: /button/
---

# Button

Buttons trigger an action or allow the user to advance a state. It renders a `<button>` element by default.

## Usage

```jsx isStatic
import { Button } from '@vtex/admin-ui'

export function Example() {
  return <Button onClick={() => {}}>Admin UI Button</Button>
}
```

## Examples

### Variant

The variant defines the appearance and emphasis of the button.

- tertiary & adaptative (low emphasis): Typically used for less important actions.
- secondary (medium emphasis): Used for more emphasis than text buttons.
- primary (high emphasis): Have the highest emphasis, as they use a color fill and shadow. Used for primary actions.

```jsx live
<Set orientation="vertical">
  <Set>
    <Button variant="adaptative-dark">Apdaptative</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="primary">Primary</Button>
  </Set>
  <Set>
    <Button variant="danger-tertiary">
      Danger Tertiary
    </Button>
    <Button variant="danger-secodary">
      Danger Secondary
    </Button>
    <Button variant="danger">Danger Primary</Button>
  </Set>
</Set>
```

### Size

The button comes in two sizes: `regular` (default) and `small`.

```jsx live
<Set>
  <Button>Regular Button</Button>
  <Button size="small">Small Button</Button>
</Set>
```

### With Icon

Buttons may include an icon before or after the text or even be icon only.

#### Icon before

Display an icon before the text.

```jsx live
<Button icon={<IconFavorite />}>Icon start</Button>
```

#### Icon after

Display an icon after the text.

```jsx live
<Button icon={<IconFavorite />} iconPosition="end">
  Icon start
</Button>
```

#### Icon Only

Display only an Icon.

```jsx live
<Button icon={<IconFavorite title="Favorite" />} aria-label="Favorite button" />
```

### State

#### Disabled

Set `disabled` to disable a button that isn’t usable.

```jsx live
function Example() {
  return (
    <Set>
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="tertiary" disabled>
        Disabled
      </Button>
    </Set>
  )
}
```

#### Loading

Set `loading` to indicate the button is loading.

```jsx live
function Example() {
  const [loading, setLoading] = React.useState(true)

  return (
    <Set>
      <Button
        loading={loading}
        variant="text"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        variant="secondary"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        Loading
      </Button>
    </Set>
  )
}
```

## Accessibility

- `Button` has role `button`.
- When `Button` has focus, <kbd>Space</kbd> and <kbd>Enter</kbd> triggers it.
- If `disabled` prop is `true`, `Button` has `disabled` and `aria-disabled` attributes set to `true`.

### Best Practices

- When using an Icon only button, you must set the `aria-label` property.

```jsx isStatic
function Example() {
  return (
    <Button
      icon={<IconFavorite title="Favorite" />}
      aria-label="Favorite button"
    />
  )
}
```

## Props

All props of `button` JSX element.

| Name         | Type                | Description                               | Required | Default   |
| ------------ | ------------------- | ----------------------------------------- | -------- | --------- |
| size         | `regular, small`    | Size of the button                        | 🚫       | `regular` |
| tone         | `main, small`       | Tone of voice                             | 🚫       | `main`    |
| variant      | `primary, secondary, tertiary, danger, danger-secondary, danger-tertiary, adaptative-dark, adaptative-light` | Button variant                            | 🚫       | `solid`   |
| icon         | `ReactNode`         | Icon of the button                        | 🚫       | -         |
| iconPosition | `start, end`        | Position of the icon                      | 🚫       | `start`   |
| disabled     | `boolean`           | Defines if the Button is disabled         | 🚫       | `false`   |
| loading      | `boolean`           | Defines if the Button is in loading state | 🚫       | `false`   |
| focusable    | `boolean`           | Defines if the Button is focusable        | 🚫       | -         |
| children     | `ReactNode`         | Button children                           | 🚫       | -         |
| csx          | `StyleProp`         | Defines component styles                  | 🚫       | `{}`      |
