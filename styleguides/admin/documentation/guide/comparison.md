---
path: /guide/comparison/
---

# Styleguide Comparison

Here's a comparison between Admin UI and [Styleguide](https://styleguide.vtex.com/) to give you an overview of the main differences.

<blockquote palette="blue">

This comparison strives to be as accurate and unbiased as possible. If you feel this information could be improved, feel free to suggest changes (with notes or evidence of claims) creating an issue on [onda](https://github.com/vtex/onda).

</blockquote>

## Overview

**Styleguide**

Current Design System, the home for all our reusable patterns, components, and assets related to product design in VTEX. It's a common language of tools and processes to facilitate how we collaborate and share knowledge across teams and projects.

**Admin UI**

A library of carefully created React components with a focus on accessibility and developer experience.

We also have other packages that are responsible for provide the entire structure used by our library. Some of them are: [Theme](/theming/default-theme/), [Iconography](/packages/admin-ui-icons/), and [Core](/packages/admin-core).

## Learning Curve

**Styleguide:** The same as learning functional CSS using [VTEX Tachyons](https://vtex.github.io/vtex-tachyons/).

**Admin UI:** We use [emotion](https://emotion.sh/docs/introduction) to implement a CSS-like, and prop-based model of styling components, making it easy to learn.

## Styling

In most applications, it is a common challenge to want to override styles for a specific context to match design requirements.

**Styleguide:** Given that Styleguide uses [VTEX Tachyons](https://vtex.github.io/vtex-tachyons/) as a CSS utility framework, you may need to rewrite the tachyons config to override specific `classNames`. To avoid conflict with the classes defined in the component, they do not receive `className` as property, so it's common to create a container or properties to override styles.

```jsx isStatic
<Card noPadding>
  <div className="pa2">{content}</div>
</Card>
```

**Admin UI:** Given that Admin UI styles are prop-based, overrides is as easy as passing a prop.

```jsx
<Card styleOverrides={{ padding: 2 }}>Card content</Card>
```

## Responsive Design

**Styleguide**: Authoring responsive styles in Styleguide requires a combination of pseudo-classes.

```jsx isStatic
<div className="w-10 w-30-m w-40-l">{content}</div>
```

**Admin UI:** Authoring responsive styles in a very easy and intuitive way.

Every [StyleObject](/theming/style-object/) property can receive a responsive value, for example:

```jsx
<Box
  styles={{
    height: 50,
    width: [50, 100, 300],
    backgroundColor: 'blue.secondary',
  }}
/>
```

We also provide the [useResponsiveValue](/hooks/use-responsive-value/) hook, that makes possible to reuse the same API for use cases outside from `StyleObject`.

```jsx
function Example() {
  const mobileText = '📱 mobile'
  const aboveTabletText = '🖥 tablet & above'
  const text = useResponsiveValue([mobileText, aboveTabletText])

  return <Box>{text}</Box>
}
```

## Accessibility

**Styleguide:** Many components do not yet support accessibility requirements, some of which are very difficult to provide.

**Admin UI:** We build our components on top of [Reakit Library](http://reakit.io/) always focusing on accessibility first.

## Typography

Typography is used to communicate information the most efficient way possible through legibility and visual hierarchy. It's a crucial tool to guide users on their tasks. It should be used on clear and delightful way.

For that, it's important to define different typography styles for an app by setting a combination of different typography attributes: **Typeface**, **weight\***, **size**, **capitalization** and **letter spacing**.

**Styleguide:** Comes with a set of `classNames` to apply the typography attributes.

```jsx isStatic
<p className="t-body lh-copy">This is a paragraph!</p>
```

**Admin UI:** Provides the [VTEX Trust font](/typography/introduction/#variable-fonts) and comes with a set of components that turns the application of the typography attributes easier.

```jsx
<Paragraph>This is a paragraph!</Paragraph>
```

## Iconography

**Styleguide:** All of the icons are provided by the styleguide package.

**Admin UI:** All of our icons are provided by the [admin-ui-icons](/packages/admin-ui-icons/) package. A library dedicated to iconography.

## Charts

**Styleguide:** Comes with a set of chart components ready to be used.

**Admin UI:** Having a charts library is something in our roadmap, but we don't have it yet.

## State

**Styleguide:** Most of the components have their states self-contained.

```jsx isStatic
function Example() {
  const [state, setState] = useState('Item 1')

  const options = [
    { value: 'Item 1', label: '1' },
    { value: 'Item 2', label: '2' },
    { value: 'Item 3', label: '3' },
  ]

  return (
    <Dropdown
      label="Small"
      size="small"
      options={options}
      value={state}
      onChange={(_, v) => setState(v)}
    />
  )
}
```

**Admin UI:** We export the entire state control using react hooks.

```jsx
function Example() {
  const items = ['Item 1', 'Item 2', 'Item 3']
  const state = useDropdownState({ items, initialSelectedItem: 'Item 1' })
  return <Dropdown items={items} state={state} label="Items" />
}
```

## Reuse Design Behavior

**Styleguide:** The component's styles are made combining tachyons classNames, so to reuse the design behavior we need to combine the same tokens.

**Admin UI:** Components styles are applied using a theme key, so to reuse the design behavior we just need to use the `themeKey` property in the [StyleObject](/theming/style-object/)

```jsx
function Example() {
  const { cn } = useSystem()
  return (
    <button className={cn({ themeKey: 'components.button.danger-regular' })}>
      Danger Button
    </button>
  )
}
```
