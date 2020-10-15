---
path: /docs/label/
---

# Label

Form label component

## Usage

- Simple usage

```jsx
import { Label, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label>
        Input Label!
        <br />
        <input value="input value" />
      </Label>
    </ThemeProvider>
  )
}
```

- Using `htmlFor` prop

```jsx
import { Label, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label htmlFor="my-input">Input Label!</Label>
      <br />
      <input id="my-input" value="input value" />
    </ThemeProvider>
  )
}
```

## Props

| prop    | type   | description                                       | required | default |
| ------- | ------ | ------------------------------------------------- | -------- | ------- |
| htmlFor | string | specifies which form element a label is bound to. | 🚫       | -       |

It also receives all the props from `BoxProps` except the `el` prop.

## Customization

You can use all the theme tokens to make customizations, and you can also use the `sx` prop.

> 💡 You can check the Theme Documentation for detailed info.

### Example

```jsx
import { Label, Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label display="flex" items="center">
        <Toggle checked={true} />
        Toggle Label!
      </Label>
    </ThemeProvider>
  )
}
```

<proptypes heading="Label" component="Label">
