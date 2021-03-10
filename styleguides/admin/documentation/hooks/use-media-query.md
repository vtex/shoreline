---
path: /hooks/use-media-query/
---

# useMediaQuery

This is a CSS media query hook for React. It listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not.

```jsx isStatic
import { useMediaQuery } from '@vtex/admin-ui'
```

## Usage

```jsx
function Example() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Text>
      {isLargerThan1024 ? 'larger than 1024px' : 'smaller than 1024px'}
    </Text>
  )
}
```

```jsx
function Example() {
  const [landscape, smallerThan720, smallerThan1024] = useMediaQuery([
    '(orientation: landscape)',
    '(max-width: 720px)',
    '(max-width: 1000px)',
  ])

  const mobile = smallerThan720 || (landscape && smallerThan1024)

  const tabletAndAbove = `🖥 tablet & above`

  const mobileText = `📱 mobile in ${landscape ? 'landscape' : 'portrait'}`

  return <Text>{mobile ? mobileText : tabletAndAbove}</Text>
}
```

## Parameter

| type               | required | description                                 |
| ------------------ | -------- | ------------------------------------------- |
| `string, string[]` | ✅       | A unique media query or an array of queries |

## Return Value

The `useMediaQuery` hook returns an array of booleans, indicating whether the given query matches or queries match.

| type        | description                               |
| ----------- | ----------------------------------------- |
| `boolean[]` | An array of matches for each query passed |
