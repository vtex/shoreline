---
path: /icons/
fullPage: true
---

# Icons

The icon set of the AdminUI.

## Usage

<collapsible heading="Usage details" visible={true}>

```jsx isStatic
import { IconName } from '@vtex/admin-ui'
```

```jsx
<Set>
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
</Set>
```

</collapsible>

<iconpropdetails heading="Icon Props" component="Icon"></iconpropdetails>
<iconpropdetails heading="Icon With Direction Props" component="IconWithDirection"></iconpropdetails>

## List

<iconpage></iconpage>
