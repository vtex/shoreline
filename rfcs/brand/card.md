# RFC Brand Card

- 📅 Start Date: 2020-08-31
- 🏆 Champion: @lucasmedeiros

# Summary

`Cards` are single containers that can display a digestible amount of information.

# Basic example

```jsx
import { Card } from '@brand-ui/card'

<Card>
  <Card.Header>
    <h1>Title</h1>
  </Card.Header>
  <Card.Body noPadding>
    <img
      width="100%"
      src="https://careers.vtex.com/assets/media/perspectives03.jpg"
    />
    <p>Image description</p>
  </Card.Body>
  <Card.Footer>
    <Button>Button</Button>
  </Card.Footer>
</Card>
```

# Detailed design

The Card has some composites: `Header` is the top section of the card. The `Body` component contains the actual content of the card, which can be images, text, etc. The `Footer` is the bottom section of the card, which can contain buttons.

All composites of the card have a `noPadding` property which can be used while displaying images with full width.

## Header

| prop     | type      | description                 | required |
| -------- | --------- | --------------------------- | -------- |
| children | boolean | content of the card header | ✔️       |
| noPadding | boolean | use the full size of the card header | 🚫       |

## Body

| prop     | type      | description                     | required |
| -------- | --------- | ------------------------------- | -------- |
| children | boolean | content of the card body | ✔️       |
| noPadding | boolean | use the full size of the card body | 🚫       |

## Footer

| prop     | type      | description                          | required |
| -------- | --------- | ------------------------------------ | -------- |
| children | boolean | content of the card footer | ✔️       |
| noPadding | boolean | use the full size of the card footer | 🚫       |

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- Document the components with its user cases, besides usage examples with all Card's features (with and without padding, with images, buttons, etc).

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
