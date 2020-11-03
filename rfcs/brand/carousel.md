# RFC Brand Carousel

- 📅 Start Date: 2020-10-30
- 🏆 Champions: @JRobsonJr

# Summary

- A Carousel communicates or provides an action within the same process.

# Basic example

```jsx
import { Carousel } from '@vtex/brand-ui'

const CarouselExample = () => (
  <Carousel>
    <div>Slide 1</div>
    <div>Slide 2</div>
  </Carousel>
);

const VariantCarousel = () => (
  <Carousel size="small" indicators={false}>
    <div>Slide 1</div>
    <div>Slide 2</div>
  </Carousel>
);
```

# Detailed design

- The Carousel implementation's being made from scratch considering that the user only has to deal with the component itself and its contents (the slides).
- Designwise, it contains navigation buttons (left and right), optional indicators of progress, and the slides, which are passed to the component as `children`.

## Props

| prop | type | description | required | defaultValue |
| ---- | ---- | ----------- | -------- | ------------ |
| children | ReactNode[] | slides displayed in the carousel | ✔️ | - |
| size | `'small' | 'regular'` | sizing of the carousel | ✔️ | `'regular'` |
| indicators | boolean | whether progress indicators should be displayed | 🚫 | true |

# Drawbacks

- At the moment, none noted. The component is already well advanced in development and is seemingly sufficient for the specification.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- We should document the Carousel's many use cases, since the component is highly adaptable, considering both variants (for size and indicators) and possible values.
