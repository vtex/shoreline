# Enforce that creates components outside render phase when using `tag` function (`@vtex/admin-ui/create-tag-component-outside-render-phase`)

Examples of **incorrect** code for this rule:

```js
import { tag } from '@vtex/admin-ui'

function Component() {
  const Box = tag('div')

  return <Box />
}
```

Examples of **correct** code for this rule:

```js
import { tag } from '@vtex/admin-ui'

const Box = tag('div')

function Component() {
  return <Box />
}
```
