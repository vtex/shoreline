# RFC Onda

- Start Date: 2020-08-25
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

Onda is the VTEX design system. It groups all styleguides in single source of thruth.
**Why ?**

- Improve awareness
- Centralize decisions
- Reuse code...

# Detailed design

Each shared component should be on the `components` folder.
Each styleguide should be on the `styleguides` folder.

# Drawbacks

Why should we _not_ do this? Please consider:

- implementation cost, both in term of code size and complexity
- the impact on teaching people
- integration of this feature with other existing and planned features
- cost of migrating existing applications (is it a breaking change?)

💡There are tradeoffs to choosing any path. Attempt to identify them here.

# Alternatives [optional]

Create separate repositories & organization (vtex-components)

- Hard sync comunication
- Duplicated builds & process
- bla bla bla

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
