---
title: Tabs
path: /tabs/
---

# Tabs

Tabs are navigation solutions for alternating between content that is at the same level of the hierarchy.

## Usage

```jsx isStatic
import { Tabs, Tab, TabList, TabPanel, useTabState } from '@vtex/admin-ui'

function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList aria-label="Usage Tabs">
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

## Example

### Fluid

This property will make the `TabList`, match the container width. By default, it has the value set to `false`.

```jsx live
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

### Default selected tab

You can set the default selected tab by passing an id to selectedId on useTabState.

```jsx live
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

You can set the selected tab by passing an `id` to the `select` returned by the `useTabState`.

```jsx live
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList fluid aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        <Button onClick={() => state.select('2')}>Go to Tab 2!</Button>
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        <Button onClick={() => state.select('1')}>Go to Tab 1!</Button>
      </TabPanel>
    </Tabs>
  )
}
```

### Manual Activation

By default, a Tab is selected when it gets focused, which reveals its corresponding TabPanel. This behavior can be changed by setting manual to true on useTabState.

```jsx live
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

### Tab

It also receives all props of `button` JSX element.

| Name | Type          | Description   | Required | Default |
| ---- | ------------- | ------------- | -------- | ------- |
| id   | `string`      | Tab's id      | 🚫       | -       |
| csx  | `StyleObject` | Custom styles | 🚫       | `{}`    |

### TabList

It also receives all props of `div` JSX element.

| Name  | Type          | Description                                                 | Required | Default |
| ----- | ------------- | ----------------------------------------------------------- | -------- | ------- |
| fluid | `boolean`     | Whether the TabList width should match the container or not | 🚫       | `false` |
| csx   | `StyleObject` | Custom styles                                               | 🚫       | `{}`    |

### TabPanel

It also receives all props of `div` JSX element.

| Name | Type          | Description                               | Required | Default |
| ---- | ------------- | ----------------------------------------- | -------- | ------- |
| id   | `string`      | The same id as the correspondent Tab's id | 🚫       | -       |
| csx  | `StyleObject` | Custom styles                             | 🚫       | `{}`    |

### useTabState

Hook parameters.

| Name       | Type      | Description                                                | Required | Default |
| ---------- | --------- | ---------------------------------------------------------- | -------- | ------- |
| selectedId | `string`  | The current selected tab's id                              | 🚫       | -       |
| baseId     | `string`  | ID that will serve as a base for all the items IDs.        | 🚫       | -       |
| manual     | `boolean` | Whether the tab selection should be manual or not          | 🚫       | `false` |
| loop       | `boolean` | Loops from the last item to the first item and vice-versa. | 🚫       | `false` |

### TabStateReturn

Properties returned by the `useTabState` hook.

| Name       | Type         | Description                            | Required | Default |
| ---------- | ------------ | -------------------------------------- | -------- | ------- |
| selectedId | `string`     | The current selected tab's id          | 🚫       | -       |
| select     | `() => void` | Moves into and selects a tab by its id | 🚫       | -       |
| first      | `() => void` | Moves focus to the first item          | 🚫       | -       |
| last       | `() => void` | Moves focus to the last item           | 🚫       | -       |
| next       | `() => void` | Moves focus to the next item           | 🚫       | -       |
| previous   | `() => void` | Moves focus to the previous item       | 🚫       | -       |
