---
path: /tabs/
---

# Tabs

Tabs are navigation solutions for alternating between content that is at the same level of the hierarchy.

## Behavior

```jsx
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList aria-label="behavior-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
        <Tab id="4">Tab 4</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        Tab 1
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        Tab 2
      </TabPanel>
      <TabPanel id="3" csx={{ padding: 3 }}>
        Tab 3
      </TabPanel>
      <TabPanel id="4" csx={{ padding: 3 }}>
        Tab 4
      </TabPanel>
    </Tabs>
  )
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Tabs, TabList, Tab, TabPanel, useTabState } from '@vtex/admin-ui'
```

## Variations

### Fluid

This property will make the `TabList`, match the container width. By default, it has the value set to `false`.

```jsx
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList fluid aria-label="fluid-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
        <Tab id="4">Tab 4</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        Tab 1
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        Tab 2
      </TabPanel>
      <TabPanel id="3" csx={{ padding: 3 }}>
        Tab 3
      </TabPanel>
      <TabPanel id="4" csx={{ padding: 3 }}>
        Tab 4
      </TabPanel>
    </Tabs>
  )
}
```

## useTabState

It has the same props of [Reakit/useTabState](https://reakit.io/docs/tab/#usetabstate) and you should pass the hook return to the Tabs' `state` property.

### Default selected tab

You can set the default selected tab by passing an id to selectedId on useTabState.

```jsx
function Example() {
  const state = useTabState({ selectedId: '2' })

  return (
    <Tabs state={state}>
      <TabList fluid aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        Tab 1
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        Tab 2
      </TabPanel>
      <TabPanel id="3" csx={{ padding: 3 }}>
        Tab 3
      </TabPanel>
    </Tabs>
  )
}
```

### Select a Tab manually

You can set the selected tab by passing an `id` to the `setSelectedId` returned by the `useTabState`.

```jsx
function Example() {
  const { setSelectedId, ...state } = useTabState()

  return (
    <Tabs state={{ setSelectedId, ...state }}>
      <TabList fluid aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        <Button onClick={() => setSelectedId('2')}>Go to Tab 2!</Button>
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        <Button onClick={() => setSelectedId('1')}>Go to Tab 1!</Button>
      </TabPanel>
    </Tabs>
  )
}
```

### Manual Activation

By default, a Tab is selected when it gets focused, which reveals its corresponding TabPanel. This behavior can be changed by setting manual to true on useTabState.

```jsx
function Example() {
  const state = useTabState({ manual: true })

  return (
    <Tabs state={state}>
      <TabList fluid aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        Tab 1
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        Tab 2
      </TabPanel>
    </Tabs>
  )
}
```

## Accessibility

- Each `TabPanel` should have an `id` correspondent to the id of its `Tab`.
- Every `TabList` should have the `aria-label` defined to guarantee accessibility.

## Props

### Tabs

| Name     | Type             | Description   | Required | Default |
| -------- | ---------------- | ------------- | -------- | ------- |
| state    | `TabStateReturn` | Tabs state    | ✅       | -       |
| children | `ReactNode`      | Tabs children | ✅       | -       |

### TabList

It also receives all props of `div` JSX element.

| Name  | Type          | Description                                                 | Required | Default |
| ----- | ------------- | ----------------------------------------------------------- | -------- | ------- |
| fluid | `boolean`     | Whether the TabList width should match the container or not | 🚫       | false   |
| csx   | `StyleObject` | Custom styles                                               | 🚫       | {}      |

### Tab

It also receives all props of `button` JSX element.

| Name | Type          | Description   | Required | Default |
| ---- | ------------- | ------------- | -------- | ------- |
| id   | `string`      | Tab's id      | 🚫       | -       |
| csx  | `StyleObject` | Custom styles | 🚫       | {}      |

### TabPanel

It also receives all props of `div` JSX element.

| Name | Type          | Description                               | Required | Default |
| ---- | ------------- | ----------------------------------------- | -------- | ------- |
| id   | `string`      | The same id as the correspondent Tab's id | 🚫       | -       |
| csx  | `StyleObject` | Custom styles                             | 🚫       | {}      |
