---
path: /guide/get-started/
redirect_from:
  - /
---

# Get started

AdminUI is a curated collection of the reusable components within VTEX admin apps.

## Installation

Then, install `@vtex/admin-ui`:

```sh
yarn add @vtex/admin-ui
```

you can also use npm:

```sh
npm install @vtex/admin-ui
```

## Usage

To start using admin-ui, you need to wrap your application root with the `ThemeProvider` component.

> ⚠️ Do not nest providers

```jsx static
import React from 'react'
import { ThemeProvider } from '@vtex/admin-ui'

function RootComponent() {
  return (
    <ThemeProvider>
      {/* ...*/}
      {/** your app code here */}
      {/* ...*/}
    </ThemeProvider>
  )
}
```
