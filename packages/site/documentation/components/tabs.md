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
      <TabsList aria-label="behavior-tabs">
        <Tab label="Tab 1" id="1" />
        <Tab label="Tab 2" id="2" />
        <Tab label="Tab 3" id="3" />
        <Tab label="Tab 4" id="4" />
      </TabsList>
      <TabContent id="1">
        <Card csx={{ marginTop: 2 }}>Tab 1 Content</Card>
      </TabContent>
      <TabContent id="2">
        <Card csx={{ marginTop: 2 }}>Tab 2 Content</Card>
      </TabContent>
      <TabContent id="3">
        <Card csx={{ marginTop: 2 }}>Tab 3 Content</Card>
      </TabContent>
      <TabContent id="4">
        <Card csx={{ marginTop: 2 }}>Tab 4 Content</Card>
      </TabContent>
    </Tabs>
  )
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Tabs, TabsList, Tab, TabContent, useTabState } from '@vtex/admin-ui'
```

## Variations

### Fluid

This property will make the `TabsList`, match the container width. By default, it has the value set to `false`.

```jsx
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabsList fluid aria-label="fluid-tabs">
        <Tab label="Tab 1" id="1" />
        <Tab label="Tab 2" id="2" />
        <Tab label="Tab 3" id="3" />
        <Tab label="Tab 4" id="4" />
      </TabsList>
      <TabContent id="1">
        <Card csx={{ marginTop: 2 }}>Tab 1 Content</Card>
      </TabContent>
      <TabContent id="2">
        <Card csx={{ marginTop: 2 }}>Tab 2 Content</Card>
      </TabContent>
      <TabContent id="3">
        <Card csx={{ marginTop: 2 }}>Tab 3 Content</Card>
      </TabContent>
      <TabContent id="4">
        <Card csx={{ marginTop: 2 }}>Tab 4 Content</Card>
      </TabContent>
    </Tabs>
  )
}
```

### useTabState

For convenience, we also provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property.

It has the same props of [Reakit/useTabState](https://reakit.io/docs/tab/#usetabstate).

#### Example

You can choose a `Tab` to be selected initially by default or change the selected `Tab` when an action is triggered. You can check it in the example below.

```jsx
function Example() {
  const { setSelectedId, ...state } = useTabState({ selectedId: '3' })

  return (
    <Card csx={{ width: 600 }}>
      <Tabs state={{ setSelectedId, ...state }}>
        <TabsList fluid aria-label="my-tabs">
          <Tab label="Tab 1" id="1" />
          <Tab label="Tab 2" id="2" />
          <Tab label="Tab 3" id="3" />
          <Tab label="Tab 4" id="4" />
        </TabsList>
        <TabContent id="1">
          <Card csx={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('2')}>Go to Tab 2!</Button>
          </Card>
        </TabContent>
        <TabContent id="2">
          <Card csx={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('3')}>Go to Tab 3!</Button>
          </Card>
        </TabContent>
        <TabContent id="3">
          <Card csx={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('4')}>Go to Tab 4!</Button>
          </Card>
        </TabContent>
        <TabContent id="4">
          <Card csx={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('1')}>Go to Tab 1!</Button>
          </Card>
        </TabContent>
      </Tabs>
    </Card>
  )
}
```

## Accessibility

- Each `TabContent` should have an `id` correspondent to the id of its `Tab`.
- Every `TabsList` should have the `aria-label` defined to guarantee accessibility.

## Props

### Tabs

| Name     | Type             | Description   | Required | Default |
| -------- | ---------------- | ------------- | -------- | ------- |
| state    | `TabStateReturn` | Tabs state    | ✅       | -       |
| children | `ReactNode`      | Tabs children | ✅       | -       |

### TabsList

It also receives all props of `div` JSX element.

| Name  | Type          | Description                                                  | Required | Default |
| ----- | ------------- | ------------------------------------------------------------ | -------- | ------- |
| fluid | `boolean`     | Whether the TabsList width should match the container or not | 🚫       | false   |
| csx   | `StyleObject` | Custom styles                                                | 🚫       | {}      |

### Tab

It also receives all props of `button` JSX element.

| Name  | Type          | Description   | Required | Default |
| ----- | ------------- | ------------- | -------- | ------- |
| label | `string`      | Tab label     | ✅       | -       |
| id    | `string`      | Tab's id      | 🚫       | -       |
| csx   | `StyleObject` | Custom styles | 🚫       | {}      |

### TabContent

It also receives all props of `div` JSX element.

| Name | Type          | Description                               | Required | Default |
| ---- | ------------- | ----------------------------------------- | -------- | ------- |
| id   | `string`      | The same id as the correspondent Tab's id | 🚫       | -       |
| csx  | `StyleObject` | Custom styles                             | 🚫       | {}      |
