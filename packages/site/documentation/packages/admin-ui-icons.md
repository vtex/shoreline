---
path: /packages/admin-ui-icons/
fullPage: true
---

# admin-ui-icons

The icon set of the AdminUI.

## Usage

<collapsible heading="Usage details" visible={true}>

You must have `@vtex/admin-ui-icons` package instaled. If you don't, try:

```sh isStatic
yarn add @vtex/admin-ui-icons @vtex/admin-core

# or

npm install @vtex/admin-ui-icons @vtex/admin-core
```

```jsx isStatic
import { IconName } from '@vtex/admin-ui-icons'
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
