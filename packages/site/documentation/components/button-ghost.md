---
path: /button-ghost/
---

# ButtonGhost

`ButtonGhost` trigger's low priority actions, or micro-actions - like close modal, show input password, and so on. It always has the [neutral tone of voice](/foundations/colors/#neutral).

## Usage

```jsx isStatic
import { ButtonGhost } from '@vtex/admin-ui'

export function Example() {
  return <ButtonGhost onClick={() => {}}>Button Ghost</ButtonGhost>
}
```

## Alternatives

- [Button](/button/) - For primary, secondary, and tertiary actions.

## Examples

### Size

The `ButtonGhost` comes in two sizes: `regular` (default), and `small`.

```jsx
<Set>
  <ButtonGhost>Regular Button</ButtonGhost>
  <ButtonGhost size="small">Small Button</ButtonGhost>
</Set>
```

### With Icon

`ButtonGhost` may include an icon before, after the text, or even be icon only.

```jsx
<Set orientation="vertical">
  <ButtonGhost icon={<IconFavorite />}>Icon start</ButtonGhost>
  <ButtonGhost icon={<IconFavorite />} iconPosition="end">
    Icon end
  </ButtonGhost>
  <ButtonGhost
    icon={<IconFavorite title="Favorite" />}
    aria-label="Favorite button"
  />
</Set>
```

### State

#### Disabled

Set `disabled` to disable a button that isn’t usable.

```jsx
<ButtonGhost disabled>Disabled</ButtonGhost>
```

#### Loading

Set `loading` to indicate the button is loading.

```jsx
function Example() {
  const [loading, setLoading] = React.useState(true)

  return (
    <ButtonGhost loading={loading} onClick={() => setLoading(!loading)}>
      Loading
    </ButtonGhost>
  )
}
```

## Accessibility

- `ButtonGhost` has role `button`.
- When `ButtonGhost` has focus, <kbd>Space</kbd> and <kbd>Enter</kbd> triggers it.
- If `disabled` prop is `true`, `ButtonGhost` has `disabled` and `aria-disabled` attributes set to `true`.

### Best Practices

- When using an icon-only `ButtonGhost`, you must set the `aria-label` property.

```jsx isStatic
function Example() {
  return (
    <ButtonGhost
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
| icon         | `ReactNode`         | Icon of the button                        | 🚫       | -         |
| iconPosition | `start, end`        | Position of the icon                      | 🚫       | `start`   |
| disabled     | `boolean`           | Defines if the Button is disabled         | 🚫       | `false`   |
| loading      | `boolean`           | Defines if the Button is in loading state | 🚫       | `false`   |
| focusable    | `boolean`           | Defines if the Button is focusable        | 🚫       | -         |
| children     | `ReactNode`         | Button children                           | 🚫       | -         |
| csx          | `StyleProp`         | Defines component styles                  | 🚫       | `{}`      |
