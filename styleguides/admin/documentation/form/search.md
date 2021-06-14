---
path: /form/search/
---

# Search

Search enables users to specify a word, phrase or term to find relevant pieces of content.

## Behavior

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={() => alert('Submited')}
      id="search-1"
      placeholder="Search"
    />
  )
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Search } from '@vtex/admin-ui'
```

## Variations

### Loading

```jsx
function Example() {
  return <Search id="search-2" placeholder="Search" loading />
}
```

### Disabled

```jsx
function Example() {
  return <Search id="search-3" placeholder="Search" disabled />
}
```

## Props

| Name         | Type                 | Description                                 | Required | Default |
| ------------ | -------------------- | ------------------------------------------- | -------- | ------- |
| loading      | `boolean`            | Defines if the Search is loading            | 🚫       | `false` |
| id           | `string`             | Search id, must be unique within a page     | ✅       | -       |
| placeholder  | `string`             | Placeholder text                            | ✅       | -       |
| onSubmit     | `() => void`         | Action to perform on submit                 | 🚫       | -       |
| containerCsx | `StyleObject`        | Style object for form wrapping search input | 🚫       | `{}`    |
| onClear      | `() => void`         | onClear input                               | 🚫       | -       |
| labelElement | `ReactNode`          | Render an optional label                    | 🚫       | -       |
| onChange     | `ChangeEventHandler` | onChange event                              | 🚫       | -       |
| error        | `boolean`            | Input error state                           | 🚫       | -       |
| csx          | `StyleProp`          | Defines component styles                    | 🚫       | `{}`    |
