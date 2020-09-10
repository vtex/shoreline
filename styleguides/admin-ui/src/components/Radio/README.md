# [alpha] admin/radio

- 📅 Start Date: 2020-09-10
- 🏆 Champions: @matheusps, @lucasaarcoverde

# Summary

Accessible Radio component that follows the [WAI-ARIA Radio Button/Group Pattern](https://www.w3.org/TR/wai-aria-practices/#radiobutton).

# Basic examples

```jsx
import { Radio, useRadioState } from '@vtex/admin-ui'

function Basic() {
  const state = useRadioState()
  return <Radio label="Label" value="value" state={state} />
}
```

# Detailed design

This is the bulk of the RFC, you must:

- Explain the design in enough detail for engineers to understand.
- Define solutions for corner-cases.
- Include examples of how the feature is used.
- Define the new terminologies.

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
