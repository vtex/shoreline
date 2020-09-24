# Brand UI Collapsible

A `Collapsible` is a container that allows toggling the display of its content. It can be nested as well.

## Design

### Composition

The Collapsible has two composites: `Header` and `Content`. It states are controlled by a custom hook, `useCollapsible`.

#### Header

| prop   | type                                                    | description               | default   | required |
| ------ | ------------------------------------------------------- | ------------------------- | --------- | -------- |
| label  | ReactNode                                               | content of the disclosure | -         | ✔️       |
| prefix | (props: { size: number; sx: SxStyleProp }) => ReactNode | prefix icon of the header | -         | 🚫       |
| suffix | (props: { size: number; sx: SxStyleProp }) => ReactNode | suffix icon of the header | -         | 🚫       |
| size   | `regular` or `small`                                    | size of the header        | `regular` | 🚫       |
| sx     | SxStyleProp                                             | Theme-ui style prop       | -         | 🚫       |

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
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

function Standalone() {
  const collapsibleProps = useCollapsible()

  return (
    <Collapsible {...collapsibleProps}>
      <Collapsible.Header label="Header" />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### Initially Visible

```jsx
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

function InitiallyVisible() {
  const collapsibleProps = useCollapsible({ visible: true })

  return (
    <Collapsible {...collapsibleProps}>
      <Collapsible.Header label="Header" />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### With Prefix Icon

```jsx
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

function WithPrefixIcon() {
  const collapsibleProps = useCollapsible()

  return (
    <Collapsible {...collapsibleProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        prefix={(props) => <Icon {...props} />}
        label="Header"
      />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### With Suffix Icon

```jsx
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

function WithSuffixIcon() {
  const collapsibleProps = useCollapsible()

  return (
    <Collapsible {...collapsibleProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        suffix={(props) => <Icon {...props} />}
        label="Header"
      />
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible>
  )
}
```

### Nested

```jsx
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

function NestedCollapsible() {
  const rootProps = useCollapsible()
  const childProps = useCollapsible()

  return (
    <Collapsible {...rootProps}>
      <Collapsible.Header label="Header" />
      <Collapsible.Content>
        <Collapsible {...childProps}>
          <Collapsible.Header label="Header" />
          <Collapsible.Content>Child content</Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}
```

### Programmatically state changes

```jsx
import { Collapsible, useCollapsible } from '@vtex/brand-ui'

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
      <Collapsible.Header label="Header" />
      <Collapsible.Content>{data}</Collapsible.Content>
    </Collapsible>
  )
}
```
