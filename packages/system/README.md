## admin-ui-system

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui-system.svg)](https://www.npmjs.com/package/@vtex/admin-ui-system)

### Install

```sh
yarn add @vtex/admin-ui-system @emotion/css @emotion/react
```

### Typescript

> If you are using typescript 4.1 & above, ignore the following steps

This package uses `emotion v11`, so if you are under typescript `4.1` you must install `@emotion/react` as a dev dependency and add it to your types.

> ⚠️ Do not install as normal dependency, otherwise it can break admin styles

```sh
yarn add @emotion/react -D
```

Add the types within `tsconfig.json`

```js
// tsconfig.json
{
  compilerOptions:{
    types: ['@emotion/react/types/css-prop'],
    // ...
  }
  // ...
}
```
