# RFC Brand Card

- 📅 Start Date: 2021-06-02
- 🏆 Champion: @lbandeira

# Summary

This RFC is to make some modifications to the component `Card` and open the possibility to change this card as a card button that can go to some link when clicked.

# Basic example

### As button
```jsx
import { Card } from '@vtex/brand-ui'

<Card 
  as="button" 
  onClick={/** */} 
  shape='square' 
  orientation='vertical'
  />
  <Card.Header  sx={}>
      <Card.Image src={`https:${card.icon}`}></Card.Image>
  </Card.Header>
  <Card.Body sx={}>
      {card.title}
  </Card.Body>
  <Card.Body sx={}>
      {card.text}
  </Card.Body
<Card/>
```

### As anchor
```jsx
<Card 
  as="a" 
  href="/tracks/" 
    shape='square' 
  orientation='vertical'
  />
  <Card.Header  sx={}>
      <Card.Image src={`https:${card.icon}`}></Card.Image>
  </Card.Header>
  <Card.Body sx={}>
      {card.title}
  </Card.Body>
  <Card.Body sx={}>
      {card.text}
  </Card.Body
<Card/>
```
### As a Link
```jsx
// If you are using gatsby, for example
import { Link } from 'gatsby'

<Card 
  as={Link} 
  to="/tracks/" 
  shape='square' 
  orientation='vertical'
  />
  <Card.Header  sx={}>
      <Card.Image src={`https:${card.icon}`}></Card.Image>
  </Card.Header>
  <Card.Body sx={}>
      {card.title}
  </Card.Body>
  <Card.Body sx={}>
      {card.text}
  </Card.Body
<Card/>

```

# Detailed design

This component is a `Card` component adding more use cases using polymorphism

## Card Button

Same props as `Card` adding the props bellow

| prop     | type      | description                     | required |
| -------- | --------- | ------------------------------- | -------- |
| as | React.ElementType,  React.ComponentType | Polymorphic render | 🚫       |
| orientation    | InputOrientation | orientation of the card                    | 🚫       |
| sx | SxStyleProp | aditional styles | 🚫       |

The `SkeletonShape` type is specified below:

```jsx
type SkeletonShape = 'rect' | 'square'
```

The `InputOrientation ` type is specified below:

```jsx
type InputOrientation  = 'horizontal' | 'vertical'
```


# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
