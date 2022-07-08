<p align="center">
  <a href="https://admin-ui.vercel.app">
  <img alt="AdminUI Design System" src="./assets/cover.png" width="100%" />
  </a>
</p>

<h1 align="center">
  AdminUI Design System
</h1>

<p align="center" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
  AdminUI is a design system created by VTEX to help teams build a high-quality and consistent experience for Admin products.
  <br />
  <a href="https://admin-ui.vercel.app" style="font-size: 1.2rem; font-weight: bold">
    📚 Documentation
  </a>
</p>

<p align="center" style="padding-bottom: 1.5rem;">
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-E6175C.svg" alt="Commitizen friendly" />
  </a>
  <a href="https://lerna.js.org/">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-E6175C.svg" alt="Maintained with Lerna" />
  </a>
  <a href="https://admin-ui.vercel.app/contributing/overview/">
    <img src="https://img.shields.io/badge/PRs-welcome-E6175C.svg" alt="PRs welcome" />
  </a>
</p>

## Packages

The fastest way to start is to install [`@vtex/admin-ui`](./packages/admin-ui) - it contains all other packages. But, for specific use cases, you may need to use some package/feature independently. So, these are the available packages:

| Package                                                                       | Description                                                                               |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`@vtex/admin-ui`](./packages/admin-ui)                                       | Main package of the design system. It contains all the react components.                  |
| [`@vtex/admin-ui-codemod`](./packages/admin-ui-codemod)                       | Codemod scripts made with jscodeshift.                                                    |
| [`@vtex/admin-ui-core`](./packages/admin-ui-core)                             | Lower level system definitions. It's a peer dependency of all other packages.             |
| [`@vtex/admin-ui-docs`](./packages/admin-ui-docs)                             | Documentation site.                                                                       |
| [`@vtex/admin-ui-form`](./packages/admin-ui-form)                             | Performant form state handling library.                                                   |
| [`@vtex/admin-ui-hooks`](./packages/admin-ui-hooks)                           | Useful reusable react hooks.                                                              |
| [`@vtex/admin-ui-react`](./packages/admin-ui-react)                           | React bindings for the [`@vtex/admin-ui-core`](./packages/admin-ui-core).                 |
| [`@vtex/admin-ui-util`](./packages/admin-ui-util)                             | Common utility functions.                                                                 |
| [`@vtex/babel-plugin-admin-ui-react`](./packages/babel-plugin-admin-ui-react) | Babel plugin relevant to the [`@vtex/admin-ui-react`](./packages/admin-ui-react) library. |
| [`@vtex/eslint-plugin-admin-ui`](./packages/eslint-plugin-admin-ui)           | Eslint rules.                                                                             |
| [`@vtex/gatsby-plugin-admin-ui`](./packages/gatsby-plugin-admin-ui)           | The easiest way to use admin-ui with gatsby.                                              |

## Contributing

AdminUI is a colaborative tool! We're always looking for contributors to help us fix bugs, build new features, or improve the project documentation. If you're interested, check out our [Contributing Guide](https://admin-ui.vercel.app/teams/contributing/onboarding) and our
[Developer Guide](https://admin-ui.vercel.app/teams/developing/getting-started)!
