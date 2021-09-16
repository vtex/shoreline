## Installation

```shell
$ yarn add -D @vtex/eslint-plugin-admin-ui
```

## Usage

Add `@vtex/admin-ui` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["@vtex/admin-ui"]
}
```

Then configure the rules you want to use within `rules` property of your `.eslintrc`:

```json
{
  "rules": {
    "@vtex/admin-ui/create-tag-component-outside-render-phase": "error"
  }
}
```

Or just extends our recommended settings:

```json
{
  "extends": ["plugin:@vtex/admin-ui/recommended"]
}
```

## Supported Rules

<!--- TODO: this section could be auto-generated -->

| Name                                                                                                                    | Description                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@vtex/admin-ui/create-tag-component-outside-render-phase`](./docs/rules/create-tag-component-outside-render-phase.md) | Enforce that creates components outside render phase when using `tag` function |
| [`@vtex/admin-ui/prefer-flex`](./docs/rules/prefer-flex.md)                                                             | Enforce the usage of Flex instead of other components with display flex        |
| [`@vtex/admin-ui/prefer-grid`](./docs/rules/prefer-grid.md)                                                             | Enforce the usage of Grid instead of other components with display grid        |
