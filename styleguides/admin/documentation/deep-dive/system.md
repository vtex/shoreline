---
path: /docs/deep-dive/system
---

# Admin UI System

> 🐋 This is a deep dive content. Is recommended for new developers within admin-ui or enthusiasts.

```bash
yarn add @vtex/admin-ui-system
---
npm install @vtex/admin-ui-system
```

`react` and `react-dom` are peer dependencies, so make sure that you also installed them.

## createElement

The `createElement` function calls `React.createElement` using a passed reakit component as base.

```jsx static
import { Box } from 'reakit/Box'
import { createElement } from '@vtex/admin-ui-system'

type Props = {
  /** */
}

function NewComponent(props: Props) {
  return createElement({
    component: Box,
    htmlProps: props,
  })
}
```

It also suports forward refs.

```jsx static
import { forwardRef, Ref } from 'react'
import { Box } from 'reakit/Box'
import { createElement } from '@vtex/admin-ui-system'

type Props = {
  /** */
}

function NewComponent(props: Props, ref: Ref<HTMLDivElement>) {
  return createElement({
    component: Box,
    htmlProps: props,
    ref: ref,
  })
}

const NewComponent = forwardRef(_NewComponent)
```

## cleanProps

It returns the corret htmlProps without strange props.

```js static
const props = {
  children: 'some text',
  id: 'id',
  sx: { c: 'blue' }
  styles: { bg: 'black' },
  palette: 'primary',
}

console.log(cleanProps(props)) // { children: 'some text', id: 'id' }
```

## useClassName

```jsx static
import { Box } from 'reakit/Box'
import { createElement, useClassName } from '@vtex/admin-ui-system'

type Props = {
  /** */
}

function NewComponent(props: Props) {
  const cn = useClassName({ props })
  return createElement({
    component: Box,
    htmlProps: props,
  })
}
```

## className
