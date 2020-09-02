# RFC Template <REPLACE_WITH_TITLE>

- Start Date: 2020-09-01
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

An accordion is a vertically stacked list of headers that reveal or hide
associated sections of content. Its main objective is to hide from view detailed
information that might not be necessary.

# Basic example [optional]

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion({ mode: 'multiOpen' })

  return (
    <Accordion {...props}>
      <Accordion.Section>
        <Accordion.Section.Header>Header 1</Accordion.Section.Header>
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```

# Detailed design

This component is a composition with the `Collapsible` component, it just handles
the list of collapsibles, controlling which one must be open.

## Accordion

| prop    | type                        | description                                                                             | required | default     |
| ------- | --------------------------- | --------------------------------------------------------------------------------------- | -------- | ----------- |
| visible | string[]                    | list with ids of open sections, if in `singleOpen` mode, only the first one will be open | 🚫       | []          |
| disabled | string[]                    | list with ids of disabled sections                                                       | 🚫       | []          |
| mode    | 'multiOpen' or 'singleOpen' | define if multiple sections can be open at the same time                                | 🚫       | `multiOpen` |
| sx      | SxStyleProp                 | Theme-ui style prop                                                                     | 🚫       | -           |

# Drawbacks

- This component depends on the `Collapsible` one.

# Alternatives

To set default open sections, there are two alternatives:

1 - Initialize the open sections, passing to the `useAccordion` an array with
the id of the sections that must be open. With this solution, the user would
need to manually set the sections id.

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion({ openSections: ['section-1', 'section-2'] })

  return (
    <Accordion {...props}>
      <Accordion.Section id="section-1">
        <Accordion.Section.Header>Header 1</Accordion.Section.Header>
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section id="section-2">
        <Accordion.Section.Header>Header 1</Accordion.Section.Header>
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```

2 - Another alternative is to pass the default visibility directly to the
section.

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion({ mode: 'singleOpen' })

  return (
    <Accordion {...props}>
      <Accordion.Section visible={true}>
        <Accordion.Section.Header>Header 1</Accordion.Section.Header>
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section visible={true}>
        <Accordion.Section.Header>Header 1</Accordion.Section.Header>
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```

The drawback of this solution is the difficulty to control the state of open
sections in the `singleOpen` mod.

# Adoption strategy [optional]

- It causes no breaking change since it is a new component.

# Education [optional]

- Document the components with its user cases, besides usage examples with all
component's features.

# Unresolved questions [optional]

- WIP
