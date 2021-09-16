# Enforce the usage of Flex instead of other components with display flex (`@vtex/admin-ui/prefer-flex`)

Examples of **incorrect** code for this rule:

```js
import { Box } from '@vtex/admin-ui'

const Component = () => {
  return <Box csx={{ display: 'flex' }}>Content</Box>
}
```

Examples of **correct** code for this rule:

```js
import { Flex } from '@vtex/admin-ui'

const Component = () => {
  return <Flex>Content</Flex>
}
```
