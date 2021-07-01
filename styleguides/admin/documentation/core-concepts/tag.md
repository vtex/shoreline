---
path: /core-concepts/tag/
---

# tag

The `tag` is used to enhance components or jsx elements with admin-ui styles. Before proceeding, make sure that you understand the [csx concept](/core-concepts/csx/).

## Jsx elements

The most common use-case is the jsx elements:

```jsx
<tag.div
  csx={{
    bg: 'blue',
    color: 'light.primary',
    padding: 4,
  }}
>
  admin-ui-powered div
</tag.div>
```

## Function

You can also use tag as a function for elements or components:

```jsx
function Example() {
  const Section = tag('section') // jsx tags are allowed
  const Button = tag(ReakitButton) // also components

  return (
    <Section csx={{ bg: 'blue.secondary', padding: 4, color: 'blue' }}>
      admin-ui-powered section
      <Button csx={{ padding: 2, bg: 'blue', color: 'light.primary' }}>
        Button
      </Button>
    </Section>
  )
}
```

## Polymorphism

A `tag` jsx element can be rendered as any HTML tag or component. To use this variation, add a valid component type to the `as` property.

```jsx
function Example() {
  const menu = useReakitMenuState()

  return (
    <>
      <tag.button
        as={ReakitMenuButton}
        {...menu}
        csx={{
          bg: 'blue',
          color: 'light.primary',
          height: 32,
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Preferences
      </tag.button>
      <tag.div
        as={ReakitMenu}
        {...menu}
        aria-label="Preferences"
        csx={{
          border: '1px solid',
          borderColor: 'dark.secondary',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          '> button': {
            borderRadius: 4,
            height: 32,
            cursor: 'pointer',
            bg: 'light.primary',
            ':hover': {
              bg: 'light.secondary',
            },
            ':active': {
              bg: 'mid.tertiary',
            },
          },
        }}
      >
        <tag.button as={ReakitMenuItem} {...menu}>
          Settings
        </tag.button>
        <tag.button as={ReakitMenuItem} {...menu}>
          Extensions
        </tag.button>
        <tag.button as={ReakitMenuItem} {...menu}>
          Keyboard shortcuts
        </tag.button>
      </tag.div>
    </>
  )
}
```
