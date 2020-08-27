# RFC Theme

- Start Date: 2020-08-27
- PR: 🚧
- Issue: 🚧

# Summary

Create a theme that can be applied in every styleguide..

# Basic example [optional]

- If the proposal involves a new or changed API, include a basic code example.

# Detailed design

```ts
export interface FeedbackPalette {
  base: string
  hover: string
  active: string
  contrast: string
  washed: string
}

interface Theme {
  space: number[]
  fonts: {
    body: string,
    heading: string,
    monospace: string
  }
  colors: {
    text: string,
    background: string,
    muted: string[],
    focus: string,
    ...{[key: string]: FeedbackPalette}
  }
  fontSizes: number[],
  /* choose between: light, regular, medium and bold.  */
  fontWeights: {
    [key: 'light' | 'regular' | 'medium' | 'bold']: number
  },
  /* line heights must be 'ems'  */
  lineHeights: {
    [key: string]: number,
  },
  borderWidths: number[],
  borderRadius: number[],
}
```

# Drawbacks

Why should we _not_ do this? Please consider:

- implementation cost, both in term of code size and complexity
- the impact on teaching people
- integration of this feature with other existing and planned features
- cost of migrating existing applications (is it a breaking change?)

💡There are tradeoffs to choosing any path. Attempt to identify them here.

# Alternatives [optional]

What other designs have been considered?

# Adoption strategy [optional]

- If we implement this proposal, how will existing developers adopt it?
- Is this a breaking change?
- Can we write a codemod?
- Should we coordinate with other projects or libraries?

# Education [optional]

- What names and terminology work best for these concepts and why?
- Would the acceptance of this proposal change the documentation somehow?
- How should this feature be taught to existing VTEX developers?

# Unresolved questions [optional]

- Optional, but suggested for first drafts.
- What parts of the design are still TBD?
