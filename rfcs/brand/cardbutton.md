# RFC Brand Card

- 📅 Start Date: 2021-06-02
- 🏆 Champion: @lbandeira

# Summary

`Cards button` are single button that can display a amount of information, and they are where the user interacts with the screen.

# Basic example

```jsx
import { Card } from '@brand-ui/card'

<CardButton  page="/tracks/"  noPadding>
  <CardButton.Header>
    <h1>Card title</h1>
    <h3>Subtitle</h3>
  </CardButton.Header>
  <CardButton.Image>
      <img
      width="100%"
      src="https://careers.vtex.com/assets/media/perspectives03.jpg"
    />
  </CardButton.Image>
  <CardButton.Body>
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
  </CardButton.Body>
</CardButton>
```

# Detailed design

This component is a composition with the `Card` component, it just handles the linked cards.

The Card button has some composites: `Header` is the top section of the card, the `Body` component contains the text of the card, and the `Images` component contains the image or icon of the card. 

## Card Button

| prop     | type      | description                     | required |
| -------- | --------- | ------------------------------- | -------- |
| children | boolean | content of the card body | ✔️       |
| page | string | the path of the page to go | 🚫       |
| noPadding | boolean | use the full size of the card body | 🚫       |

# Drawbacks

- This component depends on the `Card` and `Link`.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
