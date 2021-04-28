---
path: /core-concepts/onda-factory/
---

# onda factory

The `createOnda` function is a unique way to define and compose `admin-ui-powered` components.

## Types

Here are all the types that you need to know

```ts isStatic
type createOnda = (
  subject: React.ElementType | React.ComponentType | OndaComponent,
  sheet: Sheet,
  sync: Sync[]
) => OndaComponent

type Sheet<Variants> = StyleObject & {
  variants?: {
    [k in keyof Variants]: { [b in keyof Variants[k]]: StyleObject }
  }
}

type Sync<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
} & {
  csx?: StyleObject
}

type VariantsCall<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
}
```

## Subject

The subject is the function target. It represents what should be rendered once the `OndaComponent` is called.

### ElementType

A valid `React.ElementType` is accepted as a subject. This will create a new `OndaComponent` that renders the subject type.

```jsx
function ElementType() {
  const Button = createOnda('button')

  return <Button>Button</Button>
}
```

### ComponentType

You can also pass a component. This is useful to compose a new admin-ui powered component, to use style capabilities. This is also true for `OndaComponents`.

```jsx
function ComponentType() {
  // import { Link as GatsbyLink } from 'gatsby'
  const Link = createOnda(GatsbyLink)

  return (
    <Link
      to="/core-concepts/onda-factory/"
      csx={{
        color: 'blue',
      }}
    >
      admin-ui-powered gatsby link
    </Link>
  )
}
```

## Default Props

You can define default value for a OndaComponent props, for example:

```jsx
function DefaultProps() {
  const Square = createOnda('div', {
    size: 100,
    padding: 1,
    bg: 'light.secondary',
  })

  Square.defaultProps = {
    children: 'default',
  }

  return (
    <Set>
      <Square />
    </Set>
  )
}
```

## Sheet

You can always pass custom styles, or override the existing ones. This can be done by passing `csx` or/and `className` props to the component.

```jsx
function Styles() {
  const Div = createOnda('div', {
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

### Variants

`Variants` are props that change the component look. These are also manageble by `defaultProps`.

```jsx
function Variants() {
  const Square = createOnda('div', {
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

  Square.defaultProps = {
    color: 'blue',
  }

  return (
    <Set>
      <Square />
      <Square color="red" />
    </Set>
  )
}
```

#### Synching variants

In some cases, you may want to attach styles if two or more variants have specific values. This happens when a variant style depends on other variants, we can call it `variant overlap`. To deal with that you can use the `sync` array, which has the type:

| Name                  | Type                | Description                               | Required | Default |
| --------------------- | ------------------- | ----------------------------------------- | -------- | ------- |
| csx                   | `StyleObject`       | Style to apply if the two variants exists | ✅       | 🚫      |
| [k in keyof variants] | `keyof variants[k]` | Variants values to sync                   | 🚫       | 🚫      |

In the example below, we have a square with maybe `solid` or `outline` filling. The square can also be either `red` or `blue`. We have a `variant overlap` here because to set the final style of our square we need to know the value of both `fill` and `color` variants.

```jsx
function Sync() {
  const Square = createOnda(
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
        // if the color is blue and fill outline
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
        // if the color is red and fill outline
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

## Composition

Onda components can be extended to define a family of components

```jsx
function Composition() {
  const Square = createOnda('div', {
    size: 100,
    bg: 'mid.primary',
  })

  const BlueSquare = createOnda(Square, {
    bg: 'blue',
  })

  const RedSquare = createOnda(Square, {
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

## Polymorphism

Using the `as` prop you can define the component render type, to extend or change the behavior.

```jsx
function Polymorphism() {
  const Button = createOnda('button', {
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
