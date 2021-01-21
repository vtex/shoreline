---
path: /deep-dive/system
---

# Admin UI System

> 🐋 This is a deep dive content. Is recommended for new developers within admin-ui or advanced (low level) users.

```sh isStatic
yarn add @vtex/admin-ui-system
---
npm install @vtex/admin-ui-system
```

`react` and `react-dom` are peer dependencies, so make sure that you also installed them.

## In our context, what is a system ?

For us, system is the architecture that the rules a series of components. It takes care of how components are crearted internally and if their API is consistent throughout (props with same name, should have the same behavior within a system, for example).

## createSystem

Function designed to create .

## createElement

The `createElement` function calls `React.createElement` using a passed reakit component as base.

```jsx isStatic
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

```jsx isStatic
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

```js isStatic
const props = {
  children: 'some text',
  id: 'id',
  sx: { c: 'blue' }
  styles: { bg: 'black' },
  palette: 'primary',
}

console.log(cleanProps(props)) // { children: 'some text', id: 'id' }
```

## className
