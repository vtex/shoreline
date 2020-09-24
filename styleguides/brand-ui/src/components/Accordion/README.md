# Brand UI - Accordion

An accordion is a vertically stacked list of headers that reveal or hide
associated sections of content. Its main objective is to hide from view detailed
information that might not be necessary.

## Detailed design

### Composition

The Accordion is a composition with the `Section` component, that is composed by the `Header` and `Content` of the [Collapsible](../Collapsible) component.

### useAccordion

To handle states, you can use the `useAccordion` hook. It is extracted directly from [useCollapsible](../Collapsible) with the same props just overriding the props below.[Read more](../Collapsible)

| prop     | type     | description                                  | required | default |
| -------- | -------- | -------------------------------------------- | -------- | ------- |
| visible  | number   | index of the current visible section content | 🚫       | -1      |
| disabled | number[] | list with index of disabled sections         | 🚫       | []      |

## Usage

### Simple Usage

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion()

  return (
    <Accordion {...props}>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 1" />
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 2" />
        <Accordion.Section.Content>Content 2</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```

### Section Initially Open

For this, you just need to pass the key (index of the accordion section) to the `visible` accordion prop.

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion({ visible: 1 })

  return (
    <Accordion {...props}>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 1" />
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 2 - Initially Open" />
        <Accordion.Section.Content>Content 2</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```

### Section Disabled

For this, you just need to pass the list of indexes of the section that must be disabled to the `disabled` accordion prop.

```jsx
import { Accordion, useAccordion } from '@brand-ui'

const MyAccordion = () => {
  const props = useAccordion({ disabled: [1] })

  return (
    <Accordion {...props}>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 1" />
        <Accordion.Section.Content>Content 1</Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Header 2 - Disabled" />
        <Accordion.Section.Content>Content 2</Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
```
