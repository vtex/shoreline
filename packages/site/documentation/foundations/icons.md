---
title: Iconography
path: /foundations/icons/
---

# Iconography

<IconsGrid />

> You may notice that some icons appear opaque when you change their variations. This is because not every use case are mapped by us, if you need to use an opaque one, please [let us know](https://vtex.slack.com/archives/C01DVTFA4VA).

## Variations

### Weight

By default, all icons from the library are rendered with the `weight` with `regular` value, but all of them have support to be filled as well. You can change the weight of an icon by using the `weight` property and setting it as `regular` or `fill`. For example:

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

By default, all icons from the library are rendered with the `size` with the value being equivalent to `normal`, but all of them have support to be small as well. You can change the size of an icon by using the `size` property and setting it as `normal` or `small`. For example:

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

You can use the `mirrored` property to mirror the icon direction, for example:

```jsx
function Example() {
  return (
    <>
      <IconCaretRight mirrored />
      <IconCaretLeft mirrored />
    </>
  )
}
```
