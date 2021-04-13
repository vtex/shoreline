---
path: /core-concepts/onda-factory/
---

# onda fatory

The `onda` function is an unique way of create and extend admin-ui powered components.

## Rules

### 1. Flexible styles

You can always pass custom styles, or override the existing ones. This can be done by passing `csx` or/and `className` props to the component.

```jsx
function Styles() {
  const Div = onda('div', {
    fontSize: 3,
  })

  return (
    <Div
      csx={{
        padding: 2,
        bg: 'blue.secondary',
        '.blue-child': {
          color: 'blue',
        },
      }}
    >
      This is a <Div className="blue-child">blue child</Div>
    </Div>
  )
}
```

### 2. Polymorphic

Using the `as` prop you can define the component render type, to extend & change the component behavior.

```jsx
function Polymorphism() {
  const Button = onda('button', {
    cursor: 'pointer',
    bg: 'blue',
    color: 'light.primary',
    fontSize: 1,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingX: 2,
    borderRadius: 'default',
    textAlign: 'center',
  })

  return (
    <Set>
      <Button>Button</Button>
      <Button as="a">Button that is a link</Button>
    </Set>
  )
}
```

### 3. Extensible

Onda components can be extended to form a family of components

```jsx
function Extend() {
  const Square = onda('div', {
    size: 100,
    bg: 'mid.primary',
  })

  const BlueSquare = onda(Square, {
    bg: 'blue',
  })

  const RedSquare = onda(Square, {
    bg: 'red',
  })

  return (
    <Set>
      <Square />
      <BlueSquare />
      <RedSquare />
    </Set>
  )
}
```

## Variants

```jsx
function Override() {
  const Square = onda('div', {
    size: 100,
    variants: {
      color: {
        blue: {
          bg: 'blue',
          ':hover': {
            bg: 'blue.hover',
          },
        },
        red: {
          bg: 'red',
          ':hover': {
            bg: 'red.hover',
          },
        },
      },
    },
  })

  return (
    <Set>
      <Square color="blue" />
      <Square color="red" />
    </Set>
  )
}
```

### Synching variants

Some variants may depend from one-another, you can do that using the sync array.

```jsx
function Sync() {
  const Square = onda(
    'div',
    {
      size: 100,
      variants: {
        fill: {
          outline: {
            borderWidth: 2,
            borderStyle: 'solid',
          },
          solid: {
            border: 'none',
          },
        },
        color: {
          blue: {
            bg: 'blue',
            ':hover': {
              bg: 'blue.hover',
            },
          },
          red: {
            bg: 'red',
            ':hover': {
              bg: 'red.hover',
            },
          },
        },
      },
    },
    [
      {
        color: 'blue',
        fill: 'outline',
        csx: {
          bg: 'transparent',
          color: 'blue',
          ':hover': {
            bg: 'blue.secondary.hover',
          },
        },
      },
      {
        color: 'red',
        fill: 'outline',
        csx: {
          bg: 'transparent',
          color: 'red',
          ':hover': {
            bg: 'red.secondary.hover',
          },
        },
      },
    ]
  )

  Square.defaultProps = {
    color: 'blue',
    fill: 'solid',
  }

  return (
    <Set>
      <Square />
      <Square fill="outline" />
      <Square color="red" />
      <Square color="red" fill="outline" />
    </Set>
  )
}
```
