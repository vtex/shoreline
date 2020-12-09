---
path: /tooltip/
---

# Tooltip

Tooltips are a small informative text that appear when an item is being, hovered, focused or touched.

## Behavior

```jsx
<Tooltip label="Tooltip Label" placement="right">
  <Button icon={<IconDuplicate />} variant="tertiary" />
</Tooltip>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Tooltip } from '@vtex/admin-ui'
```

## Variation

### Label

The `label` property can be of `string` or `ReactNode` type. Check the examples below!

#### String Example

```jsx
<Tooltip label="Tooltip Label" placement="right">
  <Button icon={<IconDuplicate />} variant="tertiary" />
</Tooltip>
```

#### ReactNode Example

```jsx
<Tooltip
  label={
    <Set orientation="vertical" spacing={2}>
      <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
        Previous Order: 102183 (211-213)
      </Text>
      <Tag palette="green" label="Ready for Handling" size="small" />
      <Text variant="small">João da Silva</Text>
      <Text variant="small">49,00 BRL</Text>
    </Set>
  }
>
  <Button icon={<IconDuplicate />} variant="tertiary" />
</Tooltip>
```

### Placement

You can use the `placement` property, to change the position that the Tooltip popup will appears. By default, the property value is `top`, but you can also use the following values:

`bottom` | `right` | `left` | `auto` | `auto-start` | `auto-end` | `top-start` | `top-end` | `right-start` | `right-end` | `bottom-end` | `bottom-start` | `left-end` | `left-start`

```jsx
<Tooltip label="Tooltip Label" placement="right">
  <Button icon={<IconDuplicate />} variant="tertiary" />
</Tooltip>
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles.

### Example

For example, you can reduce the `Tooltip` opacity. One way to do this is by using the `styleOverrides` property, check the example below!

```jsx
<Tooltip label="Tooltip Label" styleOverrides={{ opacity: 0.8 }}>
  <Button icon={<IconDuplicate />} variant="tertiary" />
</Tooltip>
```

## Limitations

When using the Tooltip with a custom component, you must provide a `ref` for the Popup to work. You can easily do this using the `React.forwardRef`. Check the example below to see how it works.

### Custom Component

```jsx isStatic
import { Tooltip, Button } from '@vtex/admin-ui'
import { Icon } from '@vtex/admin-ui-icons'

function Example() {
  const CustomIcon = React.forwardRef(
    (props: IconProps, ref: Ref<SVGSVGElement>) => {
      return (
        <Icon ref={ref} {...props}>
          <circle cx="6" cy="6" r="6" fill="#D7DADF" />
          <path
            d="M6.00016 6.90246V6.72246C6.00016 6.13221 6.36466 5.81271 6.73066 5.56746C7.08766 5.32746 7.44541 5.01396 7.44541 4.43571C7.44541 3.63771 6.79891 2.99121 6.00091 2.99121C5.20291 2.99121 4.55566 3.63621 4.55566 4.43421"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.99925 8.93981C5.92725 8.93981 5.86875 8.99831 5.8695 9.07031C5.8695 9.14231 5.928 9.20081 6 9.20081C6.072 9.20081 6.1305 9.14231 6.1305 9.07031C6.1305 8.99756 6.072 8.93981 5.99925 8.93981"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      )
    }
  )

  return (
    <Tooltip label="Tooltip Label" placement="right">
      <CustomIcon />
    </Tooltip>
  )
}
```

## Props

<proptypes heading="Tooltip" component="Tooltip" />
