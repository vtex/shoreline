---
title: Paragraph
path: /paragraph/
---

# Paragraph

`<Paragraph>` renders a `<p>` element with reset styles.

## Behavior

```jsx live
<Paragraph>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a aliquam
  ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac sodales lorem
  convallis. Ut scelerisque mauris velit, sit amet iaculis elit feugiat commodo.
  Etiam egestas ante nibh, eget pulvinar erat ultrices et. In quis ante aliquam,
  ullamcorper leo et, porta sapien. Quisque lobortis eu velit at molestie. Ut
  vel gravida lorem, in efficitur nulla. Vestibulum tincidunt, nulla in semper
  dignissim, eros lacus molestie quam, sit amet tempus ante quam at mauris. Duis
  urna eros, cursus eget leo sit amet, sollicitudin blandit nibh. Cras
  pellentesque sapien nibh, eget finibus neque ultrices ut. Phasellus fermentum
  urna at ex rhoncus aliquam.
</Paragraph>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Paragraph, ParagraphProps } from '@vtex/admin-ui'
```

## Customization

You can use the `csx` property to handle different styles, and also the `TextPattern`.

### Example

```jsx live
<Paragraph text="body" padding={6} csx={{ bg: 'muted', color: 'muted' }}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a aliquam
  ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac sodales lorem
  convallis. Ut scelerisque mauris velit, sit amet iaculis elit feugiat commodo.
  Etiam egestas ante nibh, eget pulvinar erat ultrices et. In quis ante aliquam,
  ullamcorper leo et, porta sapien. Quisque lobortis eu velit at molestie. Ut
  vel gravida lorem, in efficitur nulla. Vestibulum tincidunt, nulla in semper
  dignissim, eros lacus molestie quam, sit amet tempus ante quam at mauris. Duis
  urna eros, cursus eget leo sit amet, sollicitudin blandit nibh. Cras
  pellentesque sapien nibh, eget finibus neque ultrices ut. Phasellus fermentum
  urna at ex rhoncus aliquam.
</Paragraph>
```

## Props

| Name     | Type        | Description              | Required | Default |
| -------- | ----------- | ------------------------ | -------- | ------- |
| children | `ReactNode` | Paragraph children       | 🚫       | -       |
| csx      | `StyleProp` | Defines component styles | 🚫       | `{}`    |
