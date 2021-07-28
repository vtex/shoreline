## admin-ui

> VTEX admin component library

Documentation site: https://admin-ui-docs.vercel.app/guide/get-started/

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui.svg)](https://www.npmjs.com/package/@vtex/admin-ui)

### Install

```sh
yarn add @vtex/admin-ui @vtex/admin-ui-icons
```

```sh
npm install @vtex/admin-ui @vtex/admin-ui-icons
```

### Typescript

> If you are using typescript 4.1 & above, ignore the following steps

This package uses `emotion v11`, so if you are under typescript `4.1` you must install `@emotion/react` as a dev dependency and add it to your types.

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
