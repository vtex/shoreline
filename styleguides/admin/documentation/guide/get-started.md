---
path: /guide/get-started/
redirect_from:
  - /
---

# Get started

AdminUI is a curated collection of the reusable components within VTEX admin apps.

## Installation

`admin-ui` is available as a npm package. It has `@vtex/admin-ui-icons` as a peer dependency.

```sh isStatic
yarn add @vtex/admin-ui @vtex/admin-ui-icons

# or

npm install @vtex/admin-ui @vtex/admin-ui-icons
```

> For `VTEX IO` apps you should do this on the /react folder

## Setup

### ThemeProvider

For Admin UI to work correctly, you need to setup the `ThemeProvider` at the root of your application.

Go to the root of your application and do this:

```jsx isStatic
import React from 'react'

// 1. import the ThemeProvider
import { ThemeProvider } from '@vtex/admin-ui'

function RootComponent() {
  // 2. Use at the root of your app
  return <ThemeProvider>{/** your app code here */}</ThemeProvider>
}
```

### TypeScript

Note that if you are using a typescript version below `4.1` you will need to do the following steps (VTEX-IO apps are currently included here):

1. Install `@emotion/react` as a dev dependency:

```sh isStatic
yarn add @emotion/react -D
```

2. Add the types within `tsconfig.json` (on VTEX-IO apps, choose the `tsconfig` within the `/react` folder):

```json isStatic
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@emotion/react/types/css-prop"]
    // ...
  }
  // ...
}
```

> This is due the `emotion 11` update. [Check more about it here](https://emotion.sh/docs/emotion-11)
