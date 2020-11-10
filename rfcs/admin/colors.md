# AdminUI Colors

- 📅 Start Date: 2020-11-10
- 🏆 Champions: @lucasaarcoverde @matheusps

# Summary

- Align our palette color nomenclature with the designers so that we can have a solid architecture.

- Today we have an inconsistent palette architecture, where Primary and Secondary colors nomenclature are mixed with the Feedback ones, and we also don't have the same values in the feedback colors.

- Create a way of generate the color spectrum from the base color.

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
    pressed: string,
    accent: string,
  },
  secondary: {
    base: string,
    hover: string,
    pressed: string,
    accent: string,
  },
  danger: {
    base: string,
    hover: string,
    pressed: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      pressed: string,
      accent: string,
    },
  },
  warning: {
    base: string,
    hover: string,
    pressed: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      pressed: string,
      accent: string,
    },
  },
  success: {
    base: string,
    hover: string,
    pressed: string,
    accent: string,
    washed: {
      base: string,
      hover: string,
      pressed: string,
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

Rule to generate colors

| Primary           | value                          |
| ----------------- | ------------------------------ |
| `primary.base`    | '#2953B2'                      |
| `primary.hover`   | darken('primary.base', '0.08') |
| `primary.pressed` | darken('primary.base', '0.16') |
| `primary.accent`  | '#FFFFFF'                      |

| Secondary           | value                             |
| ------------------- | --------------------------------- |
| `secondary.base`    | '#DAE3F5'                         |
| `secondary.hover`   | ligthen('secondary.base', '0.04') |
| `secondary.pressed` | ligthen('secondary.base', '0.08') |
| `secondary.accent`  | '#2953B2'                         |

| Danger           | value                         |
| ---------------- | ----------------------------- |
| `danger.base`    | '#CB4242'                     |
| `danger.hover`   | darken('danger.base', '0.08') |
| `danger.pressed` | darken('danger.base', '0.16') |
| `danger.accent`  | '#FFFFFF'                     |

| Danger Washed           | value                                 |
| ----------------------- | ------------------------------------- |
| `danger.washed.base`    | '#FEDADA'                             |
| `danger.washed.hover`   | ligthen('danger.washed.base', '0.04') |
| `danger.washed.pressed` | ligthen('danger.washed.base', '0.08') |
| `danger.washed.accent`  | '#CB4242'                             |

| Warning           | value                          |
| ----------------- | ------------------------------ |
| `warning.base`    | '#FFBA52'                      |
| `warning.hover`   | darken('warning.base', '0.08') |
| `warning.pressed` | darken('warning.base', '0.16') |
| `warning.accent`  | '#FFFFFF'                      |

| Warning Washed           | value                                  |
| ------------------------ | -------------------------------------- |
| `warning.washed.base`    | '#F6E0BA'                              |
| `warning.washed.hover`   | ligthen('warning.washed.base', '0.04') |
| `warning.washed.pressed` | ligthen('warning.washed.base', '0.08') |
| `warning.washed.accent`  | '#FFBA52'                              |

| Success           | value                          |
| ----------------- | ------------------------------ |
| `success.base`    | '#368369'                      |
| `success.hover`   | darken('success.base', '0.08') |
| `success.pressed` | darken('success.base', '0.16') |
| `success.accent`  | '#FFFFFF'                      |

| Success Washed           | value                                  |
| ------------------------ | -------------------------------------- |
| `success.washed.base`    | '#CEE8DE'                              |
| `success.washed.hover`   | ligthen('success.washed.base', '0.04') |
| `success.washed.pressed` | ligthen('success.washed.base', '0.08') |
| `success.washed.accent`  | '#368369'                              |

# Drawbacks

- Each feedback color must have a value even if it's not directly being used for now. This way we can be consistent with the structure of our color palette.
- We think about using a percentage of darkening and lightening from the base color, to generate a consistent color spectrum. The problem is that reaching that percentage and responding to the same behavior for all colors is hard work

# Adoption strategy

- Document the entire color palette.
- All the designers that are building admin's applications should be aware of this architecture.

# Education

- Add solid documentation on the designer and engineering sides.
