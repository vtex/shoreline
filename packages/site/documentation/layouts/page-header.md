---
path: /layouts/page-header/
---

# PageHeader

Users rely on the page header to navigate and orient themselves within the admin.

## Variations

### With Title

This is the basic usage. Use the `PageTitle` to render the page title.

```jsx
<PageHeader>
  <PageTitle>Product</PageTitle>
</PageHeader>
```

### With Link

The back-link is present if the `onPopNavigation` property is passed.

```jsx
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageTitle>Product</PageTitle>
</PageHeader>
```

### With Actions

Use the `PageActions` composite to add actions that are relevant for the whole page.

```jsx
<PageHeader>
  <PageTitle>Products</PageTitle>
  <PageActions>
    <Button variant="secondary">Edit</Button>
    <Button>Create</Button>
  </PageActions>
</PageHeader>
```

### Full Blown Example

All features of `PageHeader` together.

```jsx
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageTitle>Product</PageTitle>
  <PageActions>
    <Button variant="danger">Delete Item</Button>
  </PageActions>
</PageHeader>
```

## Props

### PageHeader

All props of `header` jsx element

| Name            | Type         | Description                        | Required | Default |
| --------------- | ------------ | ---------------------------------- | -------- | ------- |
| onPopNavigation | `() => void` | Action when back button is clicked | 🚫       | 🚫      |

### PageTitle

All props of `div` jsx element

### PageActions

All props of `div` jsx element
