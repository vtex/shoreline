# VTEX Admin UI

> VTEX admin component library

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui.svg)](https://www.npmjs.com/package/@vtex/admin-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Getting Started

Install from npm:

```bash
yarn add @vtex/admin-ui
```

## Appointments

### Internal Rituals

- Weekly:
  - 🗓Friday: ⏰ 11-11:30
- Daily:
  - ⏰ 9:30-9:45
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
  - 🗓Monday: ⏰ 17-17:15
  - 🗓Tuesday: ⏰ 18-18:15
  - 🗓Wednesday: ⏰ 18-18:15
  - Align the development and design efforts.
- New Admin V4 Weekly:
  - 🗓Thursday: ⏰ 14-15
- Styleguide Weekly:
  - 🗓Thursday: ⏰ 15-16
  - A quick share of our current status to other teams.

## Development

- Some feature/epic is ready to start when:
  - It was pointed on weekly/daily plannings.
  - It has a Jira board.
- The developer uses the RFC as a starting point to describe the implementation steps.
- The dailies can be used as alignment.
- Review steps, and on and on... TBD

### Commit Messages

We use [`commitlint`](https://commitlint.js.org/#/) and [`commitizen`](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/). Please take the time to understand semantic versioning before committing.

### RFCs

Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put through a design process and produce a consensus among the `admin-core-team`.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.

#### Which changes require an RFC

- A new feature that creates a new API surface area.
- The removal of features.
- The introduction of new idiomatic usage or conventions, even if they do not include code changes.

#### Which changes do not require an RFC

- Rephrasing, reorganizing, or refactoring.
- Addition or removal of warnings.
- Additions that strictly improve objective, numerical quality criteria (speedup, better browser support).
- Corrections of Bugs.
- Additions that improve documentation.

#### The Process

- Copy the template from the `rfcs/` folder.
- Rename it after `<your_title>.md`, where the title is meaningful.
- Fill in the RFC with care into the details.
- Submit a pull request so the RFC can be reviewed.
- Eventually, the team will decide whether the RFC is a candidate for inclusion in the Admin's schedule.
- If rejected, the PR is closed.
- If accepted, the PR is merged. The team will create a GitHub issue and a Jira board for it, assigning priorities.

##### RFC States

- Accepted: has a file in `rfcs/` folder, and an open issue with no developer assigned to it.
- Active: has a file in `rfcs/` folder, and an open issue with at least one developer assigned.
- Done: the RFC is deleted or turned into some documentation.

**Admin's RFC process owes its inspiration to the [React RFC process]**

[react rfc process]: https://github.com/reactjs/rfcs
