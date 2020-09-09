# RFC Divider

- 📅 Start Date: 2020-08-27
- 🏆 Champions: @lucasaarcoverde, @matheusps

# Summary

The Divider is a static structure that provides a visible boundary for elements.

# Basic example

```jsx
import { Divider } from '@vtex-components/divider'

<Divider />
<Divider orientation="vertical"/>
<Divider orientation="horizontal"/>
```

# Detailed design

It's a base component, with functionalities reused from [Reakit Separator](https://reakit.io/docs/separator/)

## Props

| prop        | type                     | description           | required | default      |
| ----------- | ------------------------ | --------------------- | -------- | ------------ |
| orientation | "horizontal", "vertical" | Divider's orientation | 🚫       | "horizontal" |
| sx          | SxStyleProp              | Theme-ui style prop   | 🚫       | -            |

## Customization

Even the `Divider` being a component that doesn't need style in the most use cases, with the `sx` prop it will be possible to do this, if necessary.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.
- It will have the same props as the Divider from [VTEX styleguide](https://styleguide.vtex.com/#/Components/Containers/Divider)

# Education

- Document the components with its user cases, besides usage examples with all Divider's features (horizontal and vertical orientation, separates two texts, etc).
