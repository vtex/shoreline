---
path: /pagination
---

# Pagination

The pagination component allows the user to move back and forth between pages showing the number of items on the page and in the rest of the collection.

```jsx isStatic
import { Pagination } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Pagination
  preposition="of"
  subject="results"
  prevLabel="Back"
  nextLabel="Next"
/>
```

```jsx

```

# usePaginationState

For convenience, we also provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property.
