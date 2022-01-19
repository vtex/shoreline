# @vtex/admin-ui-core

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui-core.svg)](https://www.npmjs.com/package/@vtex/admin-ui-core)

> Lower level system definitions. It's a peer dependency of all other packages.

This package is responsible for the following:

1.

## Install

To use Admin UI core all you need is to install the `@vtex/admin-ui-core` package.

```bash
yarn add @vtex/admin-ui-core
```

or

```bash
npm install @vtex/admin-ui-core
```

## Main Features

The core package is divided into some modules, which each one of them has it's own responsability.

### Plugins

Where we define how style properties like: `margin`, `color`, `background`, etc. will behave when being used to style a component. Plugins are compound by the following parameters:

- **Name:** Plugin name
- **Namespaces:** Keys that the plugin can access on the theme object. For example, the color plugin can have access to all keys related to color palette or color tokens.
- **Aliases:** An object that define shorthands to a known style property where the key represents the alias and the value the style property. For example, `{ mt: "marginTop" }`.
- **Rules:** An object that define which theme key the style property will have access to. For example, the `color` style property will have access to foreground tokens values on the theme.
- **Transforms:** [WIP]
- **Splits:** An object that define custom style properties that applies the same value for more than one existent style property. For example, `{ marginX: ['marginLeft', 'marginRight'] }`.

### Runtime

This module is responsible for defining how to process the style properties in runtime.

### System

### Theme

Everything related to the theme is defined here. Which are:

- Theme with its respective keys and values.
- Style Kit, which are functionalities to help applying styling and maintain the consistency.
- Design tokens

## Contributing

Feel like contributing? We have a [contributing guide](https://admin-ui.vercel.app/contributing/onboarding) to help guide you.
