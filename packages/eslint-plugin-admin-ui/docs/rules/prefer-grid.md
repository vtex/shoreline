# Enforce the usage of Grid instead of other components with display grid (`@vtex/admin-ui/prefer-grid`)

Examples of **incorrect** code for this rule:

```js
import { Box } from '@vtex/admin-ui'

const Component = () => {
  return <Box csx={{ display: 'grid' }}>Content</Box>
}
```

Examples of **correct** code for this rule:

```js
import { Grid } from '@vtex/admin-ui'

const Component = () => {
  return <Grid>Content</Grid>
}
```
