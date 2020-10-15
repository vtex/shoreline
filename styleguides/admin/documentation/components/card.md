---
path: /docs/card/
---

# Card

## Usage

```jsx
import { Card, Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card p="0" w="5/12">
        <Text variant="headline" p="6">
          Our People
        </Text>
        <img
          width="100%"
          src="https://careers.vtex.com/assets/media/perspectives03.jpg"
          alt=""
        />
        <Text el="p" variant="body" p="6">
          At VTEX we believe inclusion inspires innovation. We are committed to
          implement a recruiting process that guarantees equal opportunities for
          all, regardless of ethnicity, gender, disability, sexual orientation,
          gender identity or religion.
        </Text>
      </Card>
    </ThemeProvider>
  )
}
```
