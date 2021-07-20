# 🌊 Onda

> VTEX Design System

## Styleguides

- [admin-ui](./styleguides/admin/admin-ui)
- [brand-ui](./styleguides/brand-ui)

## Development

### Bootstrap packages

Use the following commands to bootstrap all the packages.

```bash
yarn && yarn build
```

### Storybook

Running `admin-ui`

```bash
yarn storybook:admin
```

Running `brand-ui`

```bash
yarn storybook:brand
```

### Publishing

To publish a stable version:

```bash
yarn publish:packages
```

or

```bash
yarn publish:experimental
```

To publish a experimental version

### Commit Messages

We use [`commitlint`](https://commitlint.js.org/#/) and [`commitizen`](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/). Please take the time to understand semantic versioning before committing.

### Component Graduation

> The component status

#### alpha

> For POC's

- Has a draft (not yet approved) RFC
- Allow breaking changes WITHOUT notice
- No beta or stable depends of it

#### beta

> For release candidates

- Partial or full documentation
- Not fully tested
- Allow breaking changes WITH notice
- Passed the RFC process
- Depends of stable and other betas

#### stable

> For LTS

- Full documentation
- Unit tested
- Approved by a designer
- No breaking changes allowed within a major
- Only depends of stable components

### RFCs

Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

However, in case of substantial changes, they should follow a design process and there must be a consensus about the topic in the `onda-core-team`.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.

#### Which changes require an RFC

- A new feature that creates a new API surface area.
- The removal of features.
- The introduction of new idiomatic usage or conventions, even if they do not include code changes.
- Graduate a component from `alpha` to `beta`.

#### Which changes do not require an RFC

- Rephrasing, reorganizing, or refactoring.
- Addition or removal of warnings.
- Additions that strictly improve objective, numerical quality criteria (speedup, better browser support).
- Corrections of Bugs.
- Additions that improve documentation.

#### The Process

- Copy the template from the `rfcs/` folder.
- Rename it with a meaningful title.
- Assign the champions who will represent the feature and its progress.
- Fill up all sections, making sure that everything is clear, well reasoned and understandable.
- Submit a pull request so the RFC can be reviewed.
- Eventually, the team will decide whether the RFC is a candidate for inclusion in the Onda schedule.
- If rejected, the PR is closed.
- If accepted, the PR is merged. The team will create a GitHub issue and a Jira board for it, assigning priorities.

##### RFC States

- Accepted: has a file in `rfcs/` folder, and an open issue with no developer assigned to it.
- Active: has a file in `rfcs/` folder, and an open issue with at least one developer assigned.
- Done: the RFC is deleted or turned into some documentation.

**Onda's RFC process owes its inspiration to the [React RFC process]**

[react rfc process]: https://github.com/reactjs/rfcs
