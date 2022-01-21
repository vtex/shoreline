# @vtex/admin-ui-core

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui-core.svg)](https://www.npmjs.com/package/@vtex/admin-ui-core)

> Lower level system definitions. It's a peer dependency of all other packages.

## Install

To use Admin UI core all you need is to install the `@vtex/admin-ui-core` package.

```bash
yarn add @vtex/admin-ui-core
```

or

```bash
npm install @vtex/admin-ui-core
```

## Main Features 🚀

This package is divided into some modules, and each of them has its responsibility.

### Plugins

Where we define how to style properties like: `margin`, `color`, `background`, etc. will behave when being used to style a component. Plugins are compound by the following parameters:

- **Name:** Plugin name
- **Namespaces:** Keys that the plugin can access on the theme object. For example, the color plugin can have access to all keys related to the color palette or color tokens.
- **Aliases:** An object that defines shorthands to a known style property where the key represents the alias and the value of the style property. For example, `{ mt: "marginTop" }`.
- **Rules:** An object that defines which theme key the style property will have access to. For example, the `color` style property will have access to foreground tokens values on the theme.
- **Transforms:** [WIP]
- **Splits:** An object that defines custom style properties that applies the same value for more than one existent style property. For example, `{ marginX: ['marginLeft', 'marginRight'] }`.

### Runtime

This module is responsible for defining how to process the style properties in runtime.

### System

Where we define the implementation of the builders and the `createPlugin` function.

- **Builders:** Each plugin parameter needs to be processed, and the builders are responsible for implementing this logic.

### Theme

Everything related to the theme is defined here. Which are:

- Theme with its respective keys and values.
- Style Kit, which are functionalities that help apply styles and maintain consistency.
- Design tokens

## Contributing

Feel like contributing? We have a [contributing guide](https://admin-ui.vercel.app/contributing/onboarding) to help guide you.
