---
path: /layouts/page-header/
---

# PageHeader

Users rely on the page header to navigate and orient themselves within the admin.

## Variations

### With Title

This is the basic usage. Use the `PageHeader.Title` to render the page title.

```jsx
<PageHeader>
  <PageHeader.Title>Product</PageHeader.Title>
</PageHeader>
```

### With Link

The back-link is present if the `onPopNavigation` property is passed.

```jsx
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageHeader.Title>Product</PageHeader.Title>
</PageHeader>
```

### With Actions

Use the `PageHeader.Actions` composite to add actions that are relevant for the whole page.

```jsx
<PageHeader>
  <PageHeader.Title>Products</PageHeader.Title>
  <PageHeader.Actions>
    <Button variant="secondary">Edit</Button>
    <Button>Create</Button>
  </PageHeader.Actions>
</PageHeader>
```

### Full Blown Example

All features of `PageHeader` together.

```jsx
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageHeader.Title>Product</PageHeader.Title>
  <PageHeader.Actions>
    <Button variant="danger">Delete Item</Button>
  </PageHeader.Actions>
</PageHeader>
```

## Props

### PageHeader

All props of `header` jsx element

| Name            | Type         | Description                        | Required | Default |
| --------------- | ------------ | ---------------------------------- | -------- | ------- |
| onPopNavigation | `() => void` | Action when back button is clicked | 🚫       | 🚫      |

### PageHeader.Title

All props of `div` jsx element

### PageHeader.Actions

All props of `div` jsx element
