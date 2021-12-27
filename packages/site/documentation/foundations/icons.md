---
title: Iconography
path: /foundations/icons/
---

# Iconography

<IconsGrid />

> You may notice that some icons appear opaque when you change their variations. This is because not every use case is mapped by us, if you need to use an opaque one, please [let us know by creating a Github issue](https://github.com/vtex/onda/issues/new/choose).

## Variations

### Weight

By default, all icons from the library are rendered with the value `outline`. They all have support to be either `fill` or `outline`. Example:

```jsx
function Example() {
  return (
    <>
      <IconBell />
      <IconBell weight="fill" />
      <IconEnvelope />
      <IconEnvelope weight="fill" />
    </>
  )
}
```

### Size

By default, all icons from the library are rendered with the value `regular`. They all have support to be either `small` or `regular`. Example:

```jsx
function Example() {
  return (
    <>
      <IconCaretDown />
      <IconCaretDown size="small" />
      <IconArrowUpRight />
      <IconArrowUpRight size="small" />
    </>
  )
}
```

### Mirrored

Use the `mirrored` property to mirror the icon direction, for example:

```jsx
function Example() {
  return (
    <>
      <IconCaretRight mirrored />
      <IconArrowRight mirrored />
    </>
  )
}
```

## Props

All props of `svg` JSX.Element.

| Name     | Type              | Description                                   | Required | Default   |
| -------- | ----------------- | --------------------------------------------- | -------- | --------- |
| csx      | `StyleObject`     | Styles properties                             | 🚫       | -         |
| weight   | `outline, weight` | Icon weight                                   | 🚫       | `outline` |
| size     | `small, regular`  | Icon size                                     | 🚫       | `regular` |
| mirrored | `boolean`         | Whether the icon direction is mirrored or not | 🚫       | `false`   |
