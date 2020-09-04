# Admin UI Collapsible

A `Collapsible` is a container that allows toggling the display of its content. It can be nested as well.

## Design

### Composition

The Collapsible has two composites: `Header` and `Content`. It states are controlled by a custom hook, `useCollapsible`.

#### Header

| prop     | type        | description             | required |
| -------- | ----------- | ----------------------- | -------- |
| label    | ReactNode   | title of the disclosure | 🚫       |
| children | ReactNode   | set of actions          | 🚫       |
| sx       | SxStyleProp | Theme-ui style prop     | 🚫       |

#### Content

| prop     | type        | description           | required |
| -------- | ----------- | --------------------- | -------- |
| children | ReactNode   | what's beeing toggled | 🚫       |
| sx       | SxStyleProp | Theme-ui style prop   | 🚫       |

### State

To handle states, you can use the `useCollapsible` hook. It is extracted directly from `reakit/disclosure` with the same props.
[Read more](https://reakit.io/docs/disclosure/#usedisclosurestate)

## Usage

### Standalone

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

function Standalone() {
  const props = useCollapsible()

  return (
    <Collapsible {...props}>
      <Collapsible.Header label="Label" />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### Initally Visible

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

function Standalone() {
  const props = useCollapsible({ visible: true })

  return (
    <Collapsible {...props}>
      <Collapsible.Header label="Label" />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### Standalone With Buttons

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

function WithButtons() {
  const props = useCollapsible()

  return (
    <Collapsible {...props}>
      <Collapsible.Header label="Label">
        <Button>Action 1</Button>
        <Button>Action 2</Button>
        <Button>Action 3</Button>
      </Collapsible.Header>
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### Nested

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

function NestedCollapsible() {
  const rootProps = useCollapsible()
  const childProps = useCollapsible()

  return (
    <Collapsible {...rootProps}>
      <Collapsible.Header label="Label 1" />
      <Collapsible.Content>
        <Collapsible {...childProps}>
          <Collapsible.Header label="Label 2" />
          <Collapsible.Content>Child content</Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}
```

### Programmatically state changes

```jsx
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

// function that fetches data
let dataFetcherFunction

function Standalone() {
  const collapsibleProps = useCollapsible()
  const [data, setData] = React.useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataFetcherFunction()
      // set the data from request
      setData(result.data)
      // display the hidden content
      // you can also trigger hide() or toggle() functions.
      collapsibleProps.show()
    }
    fetchData()
  }, [])

  return (
    <Collapsible {...collapsibleProps}>
      <Collapsible.Header label="Label" />
      <Collapsible.Content>{data}</Collapsible.Content>
    </Collapsible>
  )
}
```
