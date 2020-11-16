---
path: /card/
---

# Card

Cards are surfaces that display content and actions on a single topic. By default, it renders a `<div>` element.

## Behavior

```jsx
import { Card, Heading, Paragraph, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card width={500}>
        <Set orientation="vertical" spacing={3} fluid>
          <Heading>Build for community</Heading>
          <Paragraph>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </Paragraph>
        </Set>
      </Card>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Card } from '@vtex/admin-ui'
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles, and also all the [CSS Props](/theming/css-props/).

### Without Padding

For example, you can remove the padding defined on the theme. One way to do this is by combining `CSS Props` and `styleOverrides`, check the example below!

```jsx
import { Card, Heading, Paragraph, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card padding={0} width={500} styleOverrides={{ 'h1, p': { margin: 4 } }}>
        <Heading>Our People</Heading>
        <img
          width="100%"
          src="https://careers.vtex.com/assets/media/perspectives03.jpg"
          alt=""
        />
        <Paragraph>
          At VTEX we believe inclusion inspires innovation. We are committed to
          implement a recruiting process that guarantees equal opportunities for
          all, regardless of ethnicity, gender, disability, sexual orientation,
          gender identity or religion.
        </Paragraph>
      </Card>
    </ThemeProvider>
  )
}
```

# Props

As the `Card` is a container component, it receives the same properties as the [Box](/primitives/box/) component.

<proptypes heading="Card" component="Card" />
