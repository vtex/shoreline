# VTEX Admin UI

> VTEX admin component library

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui.svg)](https://www.npmjs.com/package/@vtex/admin-ui)

## Getting Started

Install from npm:

```bash
yarn add @vtex/admin-ui
```

Import the theme provider on the project root:

```tsx
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** You app here */}</ThemeProvider>
}
```

[Read more about theme](./src/theme/README.md)

## Components

| Name        | Documentation                                  | Graduation |
| ----------- | ---------------------------------------------- | ---------- |
| Button      | [Docs](./src/components/Button/README.md)      | beta       |
| Collapsible | [Docs](./src/components/Collapsible/README.md) | beta       |
| Skeleton    | [Docs](./src/components/Skeleton/README.md)    | beta       |
| Card        | 🚫TBD                                          | beta       |
| Text        | 🚫TBD                                          | beta       |
| Icons       | 🚫TBD                                          | beta       |

## Appointments

### Internal Rituals

- Weekly:
  - 🗓Fridays: ⏰ 11–11:30 AM BRT
- Daily:
  - ⏰ 9:30-9:45 AM BRT
  - dev-team alignment
- RFC Discussions:
  - Ad-hoc.
  - 30-60 minutes max
  - Generates a RFC within a PR.
  - PR still's open until some discussion is needed.
  - Once PR is merged:
    - Create a GitHub issue.
    - Create a Jira board.

### Shared Rituals

- Dailies with design team:
  - 🗓Mondays: ⏰ 5-5:15 PM BRT
  - 🗓Tuesdays: ⏰ 6-6:15 PM BRT
  - 🗓Wednesdays: ⏰ 6-6:15 PM BRT
  - Align the development and design efforts.
- New Admin V4 Weekly:
  - 🗓Thursdays: ⏰ 2–3 PM BRT
- Design System Weekly:
  - 🗓Thursdays: ⏰ 3–4 PM BRT
  - A quick share of our current status to other teams.
