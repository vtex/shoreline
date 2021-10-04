---
path: /button/
---

# Button

Buttons trigger an action or allow the user to advance a state.
This component handles all `Button` variations of the Design System. It renders a `<button>` element by default.

## Usage

```jsx isStatic
import { Button } from '@vtex/admin-ui'

export function Example() {
  return <Button onClick={() => ...}>Admin UI Button</Button>
}
```

## Examples

### Variants

It represents the button appearance and is used to convey its action.

#### Primary

```jsx
<Set orientation="vertical">
  <Button>Primary (default)</Button>
  <Button variant="danger">Dangerous Primary</Button>
</Set>
```

#### Secondary

```jsx
<Set orientation="vertical">
  <Button variant="secondary">Secondary</Button>
  <Button variant="danger-secondary">Dangerous Secondary</Button>
</Set>
```

#### Tertiary

```jsx
<Set orientation="vertical">
  <Button variant="tertiary">Tertiary</Button>
  <Button variant="danger-tertiary">Dangerous Tertiary</Button>
</Set>
```

#### Adaptative

Adapts its behavior(`bg`, `:hover`, `:active`) according to the context that the button is inserted, for example:

```jsx
<Set orientation="vertical">
  <Box
    csx={{
      color: 'dark.primary',
      bg: 'light.primary',
      padding: 4,
    }}
  >
    <Button variant="adaptative-dark" icon={<IconClose />} />
  </Box>
  <Box
    csx={{
      color: 'light.primary',
      bg: 'dark.primary',
      padding: 4,
    }}
  >
    <Button variant="adaptative-light" icon={<IconClose />} />
  </Box>
</Set>
```

### Sizes

The button comes in two sizes: `regular` (default) and `small`.

```jsx
<Set orientation="vertical">
  <Button>Regular Button</Button>
  <Button size="small">Small Button</Button>
</Set>
```

### Button With Icon

Buttons may include an icon before or after the text or even be icon only.

#### Icon before

Display an icon before the text.

```jsx
<Set orientation="vertical">
  <Button icon={<IconFavorite />}>Icon start</Button>
</Set>
```

#### Icon after

Display an icon after the text.

```jsx
<Set orientation="vertical">
  <Button icon={<IconFavorite />} iconPosition="end">
    Icon start
  </Button>
</Set>
```

#### Icon Only

Display only an Icon.

```jsx
<Button icon={<IconFavorite title="Favorite" />} aria-label="Favorite button" />
```

### States

#### Disabled

Set `disabled` to disable a button that isn’t usable.

```jsx
function Example() {
  return (
    <Set orientation="vertical" spacing={2}>
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

```jsx
function Example() {
  const [loading, setLoading] = React.useState(true)

  return (
    <Set orientation="vertical">
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

| Name         | Type        | Description                               | Required             | Default |
| ------------ | ----------- | ----------------------------------------- | -------------------- | ------- | ---------------- | --------------- | --------------- | ----------------- | -------------- | --- | ----------- |
| size         | `regular    | 'small'`                                  | Size of the button   | 🚫      | `'regular'`      |
| variant      | `primary    | secondary                                 | tertiary             | danger  | danger-secondary | danger-tertiary | adaptative-dark | adaptative-light` | Button variant | 🚫  | `'primary'` |
| icon         | `ReactNode` | Icon of the button                        | 🚫                   | -       |
| iconPosition | `'start'    | 'end'`                                    | Position of the icon | 🚫      | `'start'`        |
| disabled     | `boolean`   | Defines if the Button is disabled         | 🚫                   | `false` |
| loading      | `boolean`   | Defines if the Button is in loading state | 🚫                   | `false` |
| focusable    | `boolean`   | Defines if the Button is focusable        | 🚫                   | -       |
| children     | `ReactNode` | Button children                           | 🚫                   | -       |
| csx          | `StyleProp` | Defines component styles                  | 🚫                   | `{}`    |
