# 🌊 Onda

> VTEX Design System

## Development

### Bootstrap packages

Use the following command to bootstrap all the packages.

```bash
yarn bootstrap
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
yarn publish:canary
```

To publish a canary version

### Commit Messages

We use [`commitlint`](https://commitlint.js.org/#/) and [`commitizen`](http://commitizen.github.io/cz-cli/) to automate enforcement of [Conventional Commits](https://www.conventionalcommits.org/). Please take the time to understand semantic versioning before committing.

### RFCs

Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

However, in case of substantial changes, they should follow a design process and there must be a consensus about the topic in the `onda-core-team`.

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
- Rename it with a meaningful title.
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
