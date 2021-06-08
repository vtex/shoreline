# RFC Brand Card

- 📅 Start Date: 2021-06-02
- 🏆 Champion: @lbandeira

# Summary

This RFC is to make some modifications to the component `Card` and open the possibility to change this card as a card button that can go to some link when clicked.

# Basic example

```jsx
import { Card } from '@vtex/brand-ui'

// as button
<Card as="button" onClick={/** */} />

// as anchor
<Card as="a" href="/tracks/" />

// If you are using gatsby, for example
import { Link } from 'gatsby'

<Card as={Link} to="/tracks/" />

```

# Detailed design

This component is a `Card` component adding more use cases using polymorphism

## Card Button

Same props as `Card` adding the props bellow

| prop     | type      | description                     | required |
| -------- | --------- | ------------------------------- | -------- |
| as | string | polymorphism | 🚫       |


# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
