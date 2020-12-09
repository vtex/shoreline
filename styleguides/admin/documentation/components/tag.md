---
path: /tag/
---

# Tag

Tags represent a status, or a common denominator. They make sections and entities quickly identifiable and searchable. It renders a `div` element.

## Behavior

```jsx
<Tag
  icon={<IconFavorite />}
  label="Here goes the label!"
  handleDelete={() => window.alert('Tag deleted')}
/>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Tag, TagProps } from '@vtex/admin-ui'
```

## Variation

### Sizes

By default, the size property has a `regular` value, but you can also set it to `small`.

```jsx
<>
  <Tag label="Rio de Janeiro" />
  <Tag label="Rio de Janeiro" size="small" />
</>
```

### Palettes

By default, the palette property has the `blue` value, but you can also set it to the following values: `red`, `yellow`, `green`, `black`, and `purple`.

```jsx
<>
  <Tag label="Rio de Janeiro" />
  <Tag label="Rio de Janeiro" palette="red" />
  <Tag label="Rio de Janeiro" palette="yellow" />
  <Tag label="Rio de Janeiro" palette="green" />
  <Tag label="Rio de Janeiro" palette="black" />
  <Tag label="Rio de Janeiro" palette="purple" />
</>
```

### Deletable

You can add the `handleDelete` property to configure the tag as deletable. When this function is defined the tag will have a `button` where you can handle click events.

```jsx
<Tag label="Rio de Janeiro" handleDelete={() => window.alert('Tag deleted')} />
```

### Icon

You can add one Icon on the left side of the `Tag`. Just use the `icon` property.

```jsx
<Tag icon={<IconFavorite />} label="Rio de Janeiro" />
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles.

### Example

For example, you can add a margin to the `Tag`. One way to do this is by using the `styleOverrides` property, check the example below!

```jsx
<Tag
  icon={<IconFavorite />}
  styleOverrides={{ margin: 4 }}
  handleDelete={() => window.alert('Tag deleted')}
  label="Rio de Janeiro"
/>
```

## Props

<proptypes heading="Tag" component="Tag" />
