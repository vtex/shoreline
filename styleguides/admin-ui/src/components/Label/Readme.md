# Admin UI Label

Form label component

## Usage

- Simple usage

```jsx
import { Label } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Label>
      Input Label!
      <input value="input value" />
    </Label>
  )
}
```

- Using `htmlFor` prop

```jsx
import { Label } from '@vtex/admin-ui'

function UseCase() {
  return (
    <>
      <Label htmlFor="my-input">Input Label!</Label>
      <input id="my-input" value="input value" />
    </>
  )
}
```

## Props

| prop    | type   | description                                       | required | default |
| ------- | ------ | ------------------------------------------------- | -------- | ------- |
| htmlFor | string | specifies which form element a label is bound to. | 🚫       | -       |

It also receives all the props from `BoxProps`.

## Customization

You can use all the theme tokens to make customizations, and you can also use the `sx` prop.

> 💡 You can check the [Theme Documentation](https://admin-ui.vercel.app/?path=/story/design-system-theme--page) for detailed info.

### Example

```jsx
import { Label, Toggle } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Label display="flex" items="center">
      <Toggle checked={...} onChange={...}/>
      Toggle Label!
    </Label>
  )
}
```
