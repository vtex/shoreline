# AdminUI Colors

- 📅 Start Date: 2020-11-10
- 🏆 Champions: @lucasaarcoverde @matheusps

# Summary

Align our palette color nomenclature with the designers so that we can have a solid architecture.
Today we have an inconsistent palette architecture, where Primary and Secondary colors nomenclature are mixed with the Feedback ones, and we also don't have the same values in the feedback colors.

# Detailed design

`washed` suffix represents a light spectrum of the feedback colors.

```ts
export default {
  text: {
    primary: string,
    secondary: string,
  },
  background: string,
  brand: string,
  muted: [string, string, string, string],
  focus: string,
  primary: {
    base: string,
    hover: string,
    active: string,
    accent: string,
  },
  secondary: {
    base: string,
    hover: string,
    active: string,
    accent: string,
  },
  danger: {
    base: string,
    hover: string,
    active: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      active: string,
      accent: string,
    },
  },
  warning: {
    base: string,
    hover: string,
    active: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      active: string,
      accent: string,
    },
  },
  success: {
    base: string,
    hover: string,
    active: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      active: string,
      accent: string,
    },
  },
  basic: {
    blue: string,
    purple: string,
    yellow: string,
    green: string,
    red: string,
    black: string,
  },
}
```

# Drawbacks

- Each feedback color must have a value even if it's not directly being used for now. This way we can be consistent with the structure of our color palette.
- We think about using a percentage of darkening and lightening from the base color, to generate a consistent color spectrum. The problem is that reaching that percentage and responding to the same behavior for all colors is hard work

# Adoption strategy

- Document the entire color palette.
- All the designers that are building admin's applications should be aware of this architecture.

# Education

- Add solid documentation on the designer and engineering sides.

# Unresolved questions
