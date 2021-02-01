---
path: /tabs/
---

# Tabs

Tabs are navigation solutions for alternating between content that is in the same level of hierarchy.

## Behavior

- Each `Tab.Content` should have an `id` correspondent to the id of its `Tab`.
- Every `Tabs.List` should have the aria-label defined to guarantee accessibility.

```jsx
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Tabs.List aria-label="behavior-tabs">
        <Tabs.Tab label="Tab 1" id="1" />
        <Tabs.Tab label="Tab 2" id="2" />
        <Tabs.Tab label="Tab 3" id="3" />
        <Tabs.Tab label="Tab 4" id="4" />
      </Tabs.List>
      <Tabs.Content id="1">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 1 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="2">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 2 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="3">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 3 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="4">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 4 Content</Card>
      </Tabs.Content>
    </Tabs>
  )
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Tabs, useTabState } from '@vtex/admin-ui'
```

## Variations

### Fluid

This property will make the `TabsList`, match the container width. By default, it has the value set to `false`.

```jsx
function Example() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Tabs.List fluid aria-label="fluid-tabs">
        <Tabs.Tab label="Tab 1" id="1" />
        <Tabs.Tab label="Tab 2" id="2" />
        <Tabs.Tab label="Tab 3" id="3" />
        <Tabs.Tab label="Tab 4" id="4" />
      </Tabs.List>
      <Tabs.Content id="1">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 1 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="2">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 2 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="3">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 3 Content</Card>
      </Tabs.Content>
      <Tabs.Content id="4">
        <Card styleOverrides={{ marginTop: 2 }}>Tab 4 Content</Card>
      </Tabs.Content>
    </Tabs>
  )
}
```

### useTabState

For convenience, we also provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property.

It has the same props of [Reakit/useTabState](https://reakit.io/docs/tab/#usetabstate).

#### Example

You can manually choose a tab to be initially selected or either change the tab selected when an action is triggered. You can check these examples below.

```jsx
function Example() {
  const { setSelectedId, ...state } = useTabState({ selectedId: '3' })

  return (
    <Card styleOverrides={{ width: 600 }}>
      <Tabs state={{ setSelectedId, ...state }}>
        <Tabs.List fluid aria-label="my-tabs">
          <Tabs.Tab label="Tab 1" id="1" />
          <Tabs.Tab label="Tab 2" id="2" />
          <Tabs.Tab label="Tab 3" id="3" />
          <Tabs.Tab label="Tab 4" id="4" />
        </Tabs.List>
        <Tabs.Content id="1">
          <Card styleOverrides={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('2')}>Go to Tab 2!</Button>
          </Card>
        </Tabs.Content>
        <Tabs.Content id="2">
          <Card styleOverrides={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('3')}>Go to Tab 3!</Button>
          </Card>
        </Tabs.Content>
        <Tabs.Content id="3">
          <Card styleOverrides={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('4')}>Go to Tab 4!</Button>
          </Card>
        </Tabs.Content>
        <Tabs.Content id="4">
          <Card styleOverrides={{ marginTop: 2 }}>
            <Button onClick={() => setSelectedId('1')}>Go to Tab 1!</Button>
          </Card>
        </Tabs.Content>
      </Tabs>
    </Card>
  )
}
```

## Props

<propdetails heading="Tabs" component="Tabs"></propdetails>
<propdetails heading="Tabs.List" component="TabsList"></propdetails>
<propdetails heading="Tabs.Tab" component="Tab"></propdetails>
<propdetails heading="Tabs.Content" component="TabsContent"></propdetails>
