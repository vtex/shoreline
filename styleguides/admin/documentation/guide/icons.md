---
path: /guide/icons/
fullPage: true
---

# Icons

The icon set of the AdminV4.

## Usage

<collapsible heading="Usage details" visible={true}>

You must have `@vtex/admin-ui-icons` package instaled. If you don't, try:

```sh
yarn add @vtex/admin-ui-icons
```

```jsx
import { ThemeProvider } from '@vtex/admin-ui'
import {
  IconCard,
  IconPaymentMethod,
  IconArrow,
  IconNotifications,
} from '@vtex/admin-ui-icons'

function Example() {
  return (
    <ThemeProvider>
      <IconCard />
      <IconPaymentMethod />
      {/** With directions */}
      <IconArrow direction="up" /> {/** default */}
      <IconArrow direction="right" />
      <IconArrow direction="down" />
      <IconArrow direction="left" />
      {/** With state */}
      <IconNotifications />
      <IconNotifications on />
    </ThemeProvider>
  )
}
```

</collapsible>

<iconpropdetails heading="Icon Props" component="Icon"></iconpropdetails>
<iconpropdetails heading="Icon With Direction Props" component="IconWithDirection"></iconpropdetails>

## List

<iconpage></iconpage>
