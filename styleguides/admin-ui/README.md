# VTEX Admin UI

> VTEX admin component library

[![NPM](https://img.shields.io/npm/v/@vtex/admin-ui.svg)](https://www.npmjs.com/package/@vtex/admin-ui)

## Getting Started

Install from npm:

```bash
yarn add @vtex/admin-ui
```

**⚠️ Import the theme provider on the project root:**

```tsx
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```

> 💡 You can check the [Theme Docs](https://admin-ui.vercel.app/?path=/story/design-system-theme--page) for detailed info

## Components

| Name        | Documentation                                  | Graduation |
| ----------- | ---------------------------------------------- | ---------- |
| Button      | [Docs](./src/components/Button/README.md)      | beta       |
| Collapsible | [Docs](./src/components/Collapsible/README.md) | beta       |
| Skeleton    | [Docs](./src/components/Skeleton/README.md)    | beta       |
| Card        | [Docs](./src/components/Card/README.md)        | beta       |
| Text        | [Docs](./src/components/Text/README.md)        | beta       |
| Icons       | [Docs](./src/icons/README.md)                  | beta       |
| Toggle      | [Docs](./src/components/Toggle/README.md)      | beta       |
| Box         | [Docs](./src/components/Box/README.md)         | beta       |
