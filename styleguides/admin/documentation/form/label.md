---
path: /form/label/
---

# Label

A label for all form components.

## Import

```jsx isStatic
import { Label } from '@vtex/admin-ui'
```

## Behavior

```jsx
function Example() {
  return (
    <Label>
      Input Label!
      <br />
      <input value="input value" />
    </Label>
  )
}
```

## Props

All props of the `label` element

| Name | Type               | Description         | Required       | Default            |
| ---- | ------------------ | ------------------- | -------------- | ------------------ | --- | --- |
| csx  | `StyleObject`      | Custom styles       | 🚫             | {}                 |
| as   | `React.ElementType | React.ComponentType | OndaComponent` | Polymorphic render | 🚫  | 🚫  |
