---
title: Tooltip
path: /tooltip/
---

# Tooltip

Tooltips are a small informative popup that appears when an item is being, hovered, focused or touched. It implements [WAI-ARIA Tooltip Pattern](https://www.w3.org/TR/wai-aria-practices/#tooltip).

## Usage

```jsx isStatic
import { Tooltip } from '@vtex/admin-ui'

function Example() {
  return (
    <Tooltip label="Tooltip Label" placement="right">
      <Button icon={<IconCopy />} aria-label="Example button" />
    </Tooltip>
  )
}
```

## Examples

### String label

You can pass a string to the `label` property.

```jsx
<Tooltip label="Tooltip Label" placement="right">
  <Button icon={<IconCopy />} variant="tertiary" />
</Tooltip>
```

### Component Label

You can also pass a custom component to the `label` property.

```jsx
<Tooltip
  label={
    <Set orientation="vertical" spacing={2}>
      <Text variant="small" tone="info">
        Previous Order: 102183 (211-213)
      </Text>
      <Tag palette="green" label="Ready for Handling" size="small" />
      <Text variant="small">João da Silva</Text>
      <Text variant="small">49,00 BRL</Text>
    </Set>
  }
>
  <Button icon={<IconCopy />} variant="tertiary" />
</Tooltip>
```

### Initially visible

You can use the `visible` property to set the initial visibility of the tooltip.

```jsx
<Tooltip label="Tooltip Label" visible placement="right">
  <Button icon={<IconCopy />} variant="tertiary" />
</Tooltip>
```

### Placement

You can use the `placement` property to change the position that the Tooltip popup will appears.

```jsx
<Tooltip label="Tooltip Label" placement="right">
  <Button icon={<IconCopy />} variant="tertiary" />
</Tooltip>
```

### Custom Component

When using the Tooltip with a custom component, you must provide a `ref` for the Popup to work. You can easily do this using the [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html).

```jsx isStatic
import React, { Ref, forwardRef } from '@vtex/admin-ui'
import { Tooltip } from '@vtex/admin-ui'

const CustomIcon = forwardRef((props, ref: Ref<SVGSVGElement>) => {
  return (
    <svg {...props} ref={ref}>
      ...
    </svg>
  )
})

function Example() {
  return (
    <Tooltip label="Tooltip Label" placement="right">
      <CustomIcon />
    </Tooltip>
  )
}
```

## Accessibility

- `Tooltip` has `role="tooltip"`.
- Tooltip's children has `aria-describedby` referring to the `Tooltip`.
- <kbd>Esc</kbd> hides the current visible tooltip.

## Props

It also receive all props of `div` JSX element.

| Name      | Type                                                                                | Description                                                          | Required | Default |
| --------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- | ------- |
| children  | `ReactNode`                                                                         | The element that triggers the tooltip                                | ✅       | -       |
| label     | `ReactNode`                                                                         | Label shown inside the tooltip                                       | ✅       | -       |
| placement | `auto-start, auto, auto-end, top-start, top, top-end, right-start, bottom, or left` | The placement of the tooltip relative to its children                | 🚫       | `top`   |
| visible   | `boolean`                                                                           | Whether the tooltip is visible or not                                | 🚫       | `false` |
| fixed     | `boolean`                                                                           | Whether the tooltip popover should have position set to fixed or not | 🚫       | `false` |
| baseId    | `string`                                                                            | Tooltip baseId                                                       | 🚫       | -       |
| csx       | `StyleProps`                                                                        | Custom styles                                                        | 🚫       | `{}`    |
